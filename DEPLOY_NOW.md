# 🚀 Recommended Deployment: Vercel + Railway

## Why This Setup?
- **Vercel**: Best-in-class Next.js hosting (made by Next.js team)
- **Railway**: Simple, reliable Node.js backend hosting
- Both have excellent free tiers
- Fast, easy deployments

---

## Step-by-Step Deployment

### 1️⃣ Deploy Backend to Railway (Do this first)

1. Go to **https://railway.app**
2. Sign up/login (use GitHub for easiest setup)
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
   - If repo isn't connected, authorize Railway to access your GitHub
   - Select the `DallasCourier` repository
5. Railway will auto-detect the project
6. Click **"Add Service"** → **"GitHub Repo"** (if not already added)
7. In service settings, set:
   - **Root Directory**: `server`
   - **Start Command**: `npm start` (auto-detected)
8. Go to **Variables** tab, add:
   - `JWT_SECRET`: Click "Generate" or use a random string
   - `CLIENT_URL`: Leave empty for now (we'll add after frontend deploys)
9. Railway will auto-deploy
10. Once deployed, click on the service → **Settings** → copy the **Public Domain** URL
   - Example: `https://dallas-courier-backend-production.up.railway.app`

---

### 2️⃣ Deploy Frontend to Vercel

1. Go to **https://vercel.com**
2. Sign up/login (use GitHub for easiest setup)
3. Click **"Add New..."** → **"Project"**
4. Import your `DallasCourier` repository
5. Configure project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: Click "Edit" → set to `client`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
6. Add Environment Variable:
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: Your Railway backend URL from step 1
     - Example: `https://dallas-courier-backend-production.up.railway.app`
7. Click **"Deploy"**
8. Wait for deployment (usually 1-2 minutes)
9. Copy your frontend URL
   - Example: `https://dallas-courier.vercel.app`

---

### 3️⃣ Update Backend CORS Settings

1. Go back to Railway dashboard
2. Open your backend service
3. Go to **Variables** tab
4. Update `CLIENT_URL` with your Vercel frontend URL
   - Example: `https://dallas-courier.vercel.app`
5. Railway will automatically redeploy

---

## ✅ You're Done!

Your app is now live:
- **Frontend**: Your Vercel URL
- **Backend**: Your Railway URL

### Demo Login Credentials:
- **Admin**: `admin@demo.com` / `admin123`
- **Driver**: `driver@demo.com` / `driver123`

---

## 🔄 Updating Your Deployment

After making code changes:
- **Vercel**: Auto-deploys on git push to main branch
- **Railway**: Auto-deploys on git push to main branch

Both platforms watch your GitHub repo and deploy automatically!

---

## 💡 Pro Tips

1. **Custom Domains**: Both platforms support custom domains (free on Vercel, paid on Railway)
2. **Environment Variables**: Update them in platform dashboards, no code changes needed
3. **Logs**: View real-time logs in both Vercel and Railway dashboards
4. **Rollbacks**: Both platforms keep deployment history for easy rollbacks

---

## 🆘 Troubleshooting

**Frontend can't connect to backend?**
- Check `NEXT_PUBLIC_API_URL` in Vercel matches Railway URL
- Check `CLIENT_URL` in Railway matches Vercel URL
- Ensure both services are deployed and running

**Build fails?**
- Check logs in Vercel/Railway dashboard
- Ensure all dependencies are in `package.json`
- Check Node.js version compatibility

---

**Estimated Time**: 10-15 minutes total

