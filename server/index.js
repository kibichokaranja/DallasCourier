import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'demo-secret-key-change-in-production';

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// In-memory data stores
const users = [
  {
    id: "1",
    name: "Dispatch Admin",
    email: "admin@demo.com",
    password: "admin123",
    role: "admin"
  },
  {
    id: "2",
    name: "John Driver",
    email: "driver@demo.com",
    password: "driver123",
    role: "driver"
  }
];

const drivers = [
  { id: "2", name: "John Driver", status: "active" }, // ID matches user ID "2"
  { id: "3", name: "Sarah Martinez", status: "active" },
  { id: "4", name: "Mike Johnson", status: "offline" }
];

const jobs = [
  {
    id: "1",
    customerName: "ABC Corporation",
    pickupAddress: "123 Main St, Dallas, TX 75201",
    dropoffAddress: "456 Commerce Ave, Dallas, TX 75202",
    price: 45.00,
    status: "In Progress",
    assignedDriverId: "2", // Updated to match John Driver's user/driver ID
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "2",
    customerName: "Tech Solutions Inc",
    pickupAddress: "789 Business Blvd, Dallas, TX 75203",
    dropoffAddress: "321 Market St, Dallas, TX 75204",
    price: 62.50,
    status: "Pending",
    assignedDriverId: "2", // Updated to match John Driver's user/driver ID
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "3",
    customerName: "Global Logistics",
    pickupAddress: "555 Industrial Way, Dallas, TX 75205",
    dropoffAddress: "777 Warehouse Rd, Dallas, TX 75206",
    price: 89.00,
    status: "Completed",
    assignedDriverId: "2", // Updated to match John Driver's user/driver ID
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "4",
    customerName: "Retail Express",
    pickupAddress: "999 Storefront Ln, Dallas, TX 75207",
    dropoffAddress: "111 Delivery Dr, Dallas, TX 75208",
    price: 35.75,
    status: "Pending",
    assignedDriverId: null,
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString()
  }
];

const activityLog = [
  {
    id: "1",
    message: "Server started - demo data loaded",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "2",
    message: "New job created for ABC Corporation",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "3",
    message: "Job #1 assigned to John Driver",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "4",
    message: "Job #1 status updated to In Progress by John Driver",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "5",
    message: "New job created for Tech Solutions Inc",
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "6",
    message: "Job #3 status updated to Completed by John Driver",
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
  }
];

// Helper function to add activity log entry
function addActivityLog(message) {
  const entry = {
    id: String(Date.now()),
    message,
    timestamp: new Date().toISOString()
  };
  activityLog.unshift(entry);
  // Keep only last 100 entries
  if (activityLog.length > 100) {
    activityLog.pop();
  }
  return entry;
}

// Auth middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.find(u => u.id === decoded.userId);
    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.user = { id: user.id, name: user.name, email: user.email, role: user.role };
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// Admin-only middleware
function requireAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}

// Auth endpoints
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  addActivityLog(`User ${user.name} (${user.role}) logged in`);

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});

// Get current user
app.get('/api/me', authenticateToken, (req, res) => {
  res.json(req.user);
});

// Drivers endpoints
app.get('/api/drivers', authenticateToken, requireAdmin, (req, res) => {
  res.json(drivers);
});

app.post('/api/drivers', authenticateToken, requireAdmin, (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Driver name required' });
  }

  const newDriver = {
    id: String(Date.now()),
    name,
    status: "active"
  };

  drivers.push(newDriver);
  addActivityLog(`Admin created new driver: ${name}`);

  res.status(201).json(newDriver);
});

// Jobs endpoints
app.get('/api/jobs', authenticateToken, (req, res) => {
  if (req.user.role === 'admin') {
    res.json(jobs);
  } else {
    // Driver: only their assigned jobs
    const driverJobs = jobs.filter(job => job.assignedDriverId === req.user.id);
    res.json(driverJobs);
  }
});

app.post('/api/jobs', authenticateToken, requireAdmin, (req, res) => {
  const { customerName, pickupAddress, dropoffAddress, price, assignedDriverId } = req.body;

  if (!customerName || !pickupAddress || !dropoffAddress || !price) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newJob = {
    id: String(Date.now()),
    customerName,
    pickupAddress,
    dropoffAddress,
    price: parseFloat(price),
    status: "Pending",
    assignedDriverId: assignedDriverId || null,
    createdAt: new Date().toISOString()
  };

  jobs.push(newJob);
  addActivityLog(`New job created for ${customerName}`);

  res.status(201).json(newJob);
});

app.patch('/api/jobs/:id/status', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['Pending', 'In Progress', 'Completed'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  const job = jobs.find(j => j.id === id);
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }

  // Drivers can only update their own jobs
  if (req.user.role === 'driver' && job.assignedDriverId !== req.user.id) {
    return res.status(403).json({ error: 'You can only update your assigned jobs' });
  }

  job.status = status;
  addActivityLog(`Job #${id} status updated to ${status} by ${req.user.name}`);

  res.json(job);
});

// Activity log endpoint
app.get('/api/activity', authenticateToken, requireAdmin, (req, res) => {
  const limit = parseInt(req.query.limit) || 50;
  const recentLogs = activityLog.slice(0, limit);
  res.json(recentLogs);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Demo data loaded:`);
  console.log(`   - ${users.length} users`);
  console.log(`   - ${drivers.length} drivers`);
  console.log(`   - ${jobs.length} jobs`);
  console.log(`   - ${activityLog.length} activity log entries`);
});


