# Deployment Guide

## Frontend (Next.js) - Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel --prod`
4. Set environment variable: `NEXT_PUBLIC_API_URL` to your backend URL

Or use Vercel dashboard:
1. Go to https://vercel.com
2. Import your Git repository
3. Set root directory to `client`
4. Add environment variable: `NEXT_PUBLIC_API_URL` = your backend URL
5. Deploy

## Backend (Express) - Railway

1. Install Railway CLI: `npm i -g @railway/cli`
2. Login: `railway login`
3. Initialize: `cd server && railway init`
4. Deploy: `railway up`
5. Set environment variables:
   - `PORT` (auto-set by Railway)
   - `JWT_SECRET` (generate a secure secret)
   - `CLIENT_URL` (your Vercel frontend URL)

Or use Railway dashboard:
1. Go to https://railway.app
2. New Project → Deploy from GitHub
3. Select your repository
4. Set root directory to `server`
5. Add environment variables:
   - `JWT_SECRET` = (generate secure secret)
   - `CLIENT_URL` = (your Vercel frontend URL)
6. Deploy

## Quick Deploy Commands

### Frontend (Vercel)
```bash
cd client
vercel --prod
```

### Backend (Railway)
```bash
cd server
railway up
```

## Alternative: Render.com

Both frontend and backend can be deployed on Render:
- Frontend: Static Site or Web Service
- Backend: Web Service

Visit https://render.com for setup instructions.

