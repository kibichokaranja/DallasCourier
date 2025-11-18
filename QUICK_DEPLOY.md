# Quick Deployment Guide

## Option 1: Render.com (Easiest - Both Frontend & Backend)

### Backend Deployment:
1. Go to https://render.com and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repo (or use public repo URL)
4. Configure:
   - **Name**: dallas-courier-backend
   - **Root Directory**: server
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   - `JWT_SECRET`: Generate a random string (e.g., use https://randomkeygen.com/)
   - `CLIENT_URL`: Will add after frontend is deployed
   - `PORT`: Leave default (Render sets this automatically)
6. Click "Create Web Service"
7. Copy the service URL (e.g., `https://dallas-courier-backend.onrender.com`)

### Frontend Deployment:
1. In Render dashboard, click "New +" → "Web Service"
2. Connect the same GitHub repo
3. Configure:
   - **Name**: dallas-courier-frontend
   - **Root Directory**: client
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Add Environment Variable:
   - `NEXT_PUBLIC_API_URL`: Your backend URL from step above (e.g., `https://dallas-courier-backend.onrender.com`)
5. Click "Create Web Service"
6. Copy the frontend URL

### Final Step:
1. Go back to backend service settings
2. Update `CLIENT_URL` environment variable with your frontend URL
3. Redeploy backend service

---

## Option 2: Vercel (Frontend) + Railway (Backend)

### Frontend - Vercel:
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Set **Root Directory** to `client`
4. Add Environment Variable:
   - `NEXT_PUBLIC_API_URL`: [Backend URL from Railway]
5. Deploy

### Backend - Railway:
1. Go to https://railway.app/new
2. "Deploy from GitHub repo"
3. Select your repository
4. Add new service, set:
   - **Root Directory**: `server`
5. Add Environment Variables:
   - `JWT_SECRET`: [Generate secure random string]
   - `CLIENT_URL`: [Vercel frontend URL]
6. Deploy and copy the URL

---

## Option 3: Vercel CLI (If you have accounts set up)

```bash
# Frontend
cd client
npx vercel --prod

# Backend - Railway CLI
cd server
npx @railway/cli login
npx @railway/cli up
```

---

## Demo URLs After Deployment:

- **Frontend**: Your deployed frontend URL
- **Backend API**: Your deployed backend URL

### Login Credentials:
- **Admin**: admin@demo.com / admin123
- **Driver**: driver@demo.com / driver123

---

**Recommended**: Use Render.com for the easiest deployment of both services in one place.

