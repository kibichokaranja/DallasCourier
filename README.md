# Dallas Delivery Portal (Demo)

A polished demo web application for a fictional courier company "Dallas Courier" to showcase delivery operations management capabilities to potential US clients.

## Overview

This is a full-stack demo application that demonstrates:

- **Admin Portal**: Complete dashboard with metrics, job management, driver management, and activity logging
- **Driver Portal**: Simple interface for drivers to view and manage their assigned delivery jobs
- **Real-time Updates**: Activity log and job status updates
- **Clean UI**: Modern, responsive design built with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 14 (App Router) with React and TypeScript
- **Backend**: Node.js with Express
- **Styling**: Tailwind CSS
- **Authentication**: JWT-based with in-memory sessions

## Project Structure

```
DallasCourier/
├── client/          # Next.js frontend application
├── server/          # Express backend API server
└── README.md        # This file
```

## Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation & Running

1. **Install server dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Install client dependencies:**
   ```bash
   cd ../client
   npm install
   ```

3. **Start the server:**
   ```bash
   cd server
   npm run dev
   ```
   Server will run on `http://localhost:4000`

4. **Start the client (in a new terminal):**
   ```bash
   cd client
   npm run dev
   ```
   Client will run on `http://localhost:3000`

5. **Open your browser:**
   Navigate to `http://localhost:3000`

## Demo Credentials

### Admin Account
- **Email**: `admin@demo.com`
- **Password**: `admin123`
- **Access**: Full admin dashboard with all features

### Driver Account
- **Email**: `driver@demo.com`
- **Password**: `driver123`
- **Access**: Driver dashboard with assigned jobs only

## Features

### Admin Features

1. **Dashboard** (`/admin/dashboard`)
   - Real-time metrics (total jobs, pending, in progress, completed, active drivers)
   - Latest jobs overview
   - Quick status overview

2. **Jobs Management** (`/admin/jobs`)
   - View all jobs in a table
   - Create new delivery jobs
   - Update job status
   - See assigned drivers

3. **Drivers Management** (`/admin/drivers`)
   - View all drivers
   - Add new drivers
   - See driver statistics (total jobs, active jobs)

4. **Activity Log** (`/admin/activity`)
   - Real-time activity feed
   - All system events and user actions
   - Auto-refreshes every 5 seconds

### Driver Features

1. **Dashboard** (`/driver/dashboard`)
   - View assigned jobs only
   - Quick stats (pending, in progress)
   - Update job status:
     - Start job (Pending → In Progress)
     - Mark as completed (In Progress → Completed)

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with email/password
- `GET /api/me` - Get current user info

### Drivers (Admin only)
- `GET /api/drivers` - Get all drivers
- `POST /api/drivers` - Create new driver

### Jobs
- `GET /api/jobs` - Get jobs (all for admin, assigned only for driver)
- `POST /api/jobs` - Create new job (admin only)
- `PATCH /api/jobs/:id/status` - Update job status

### Activity (Admin only)
- `GET /api/activity` - Get activity log entries

## Environment Variables

### Server
- `PORT` - Server port (default: 4000)
- `CLIENT_URL` - Frontend URL for CORS (default: http://localhost:3000)
- `JWT_SECRET` - Secret key for JWT tokens

### Client
- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:4000)

The client `.env.local` file is already configured with defaults.

## Important Notes

⚠️ **This is a demo application:**
- All data is stored in memory and resets when the server restarts
- Passwords are stored in plain text (for demo purposes only)
- No database is used - all data is ephemeral
- JWT secret is a default value - change for production use

## Development

### Server
- Development: `npm run dev` (with auto-reload)
- Production: `npm start`

### Client
- Development: `npm run dev` (with hot reload)
- Production: `npm run build && npm start`

## Deployment Considerations

For production deployment:

1. Replace in-memory storage with a real database (PostgreSQL, MongoDB, etc.)
2. Use environment variables for all secrets
3. Implement proper password hashing (bcrypt, argon2, etc.)
4. Add rate limiting and security headers
5. Set up proper CORS configuration
6. Add input validation and sanitization
7. Implement proper error logging
8. Add database migrations and seed scripts

## Support

This is a demo application built to showcase delivery portal capabilities. For questions or issues, refer to the individual README files in `/server` and `/client` directories.

---

**Built for demonstration purposes** - Showcasing modern web development practices for courier and delivery management systems.


