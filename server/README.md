# Dallas Courier Server

Backend API server for the Dallas Courier demo portal.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm run dev
```

Or for production:
```bash
npm start
```

The server will run on `http://localhost:4000` by default.

## Environment Variables

- `PORT` - Server port (default: 4000)
- `CLIENT_URL` - Frontend URL for CORS (default: http://localhost:3000)
- `JWT_SECRET` - Secret key for JWT tokens (default: demo-secret-key-change-in-production)

## Demo Credentials

### Admin
- Email: `admin@demo.com`
- Password: `admin123`

### Driver
- Email: `driver@demo.com`
- Password: `driver123`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with email and password
- `GET /api/me` - Get current user info (requires auth)

### Drivers (Admin only)
- `GET /api/drivers` - Get all drivers
- `POST /api/drivers` - Create a new driver

### Jobs
- `GET /api/jobs` - Get jobs (all for admin, assigned only for driver)
- `POST /api/jobs` - Create a new job (admin only)
- `PATCH /api/jobs/:id/status` - Update job status

### Activity Log (Admin only)
- `GET /api/activity` - Get activity log entries

## Data Storage

All data is stored in memory and will reset when the server restarts. This is intentional for the demo.


