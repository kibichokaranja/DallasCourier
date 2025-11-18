# 🚀 Step-by-Step Deployment Guide (Beginner-Friendly)

Follow these steps in order. Take your time - there's no rush!

---

## 📋 STEP 0: Push Your Code to GitHub

**Why?** Both Vercel and Railway need to access your code from GitHub.

### 0.1 Create a GitHub Repository

1. Go to **https://github.com** and sign in (or create an account)
2. Click the **"+"** icon in the top right → **"New repository"**
3. Fill in:
   - **Repository name**: `DallasCourier` (or any name you like)
   - **Description**: "Dallas Courier Demo App"
   - **Visibility**: Choose Public or Private (both work)
   - **DO NOT** check "Initialize with README" (we already have code)
4. Click **"Create repository"**

### 0.2 Push Your Code to GitHub

GitHub will show you commands. Use these (we'll run them in terminal):

```bash
git remote add origin https://github.com/YOUR_USERNAME/DallasCourier.git
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

---

## 🔧 STEP 1: Deploy Backend to Railway

**Why first?** We need the backend URL to configure the frontend.

### 1.1 Create Railway Account

1. Go to **https://railway.app**
2. Click **"Start a New Project"** or **"Login"**
3. Sign up using **GitHub** (easiest option - click "Login with GitHub")
4. Authorize Railway to access your GitHub account

### 1.2 Create New Project

1. After logging in, you'll see the Railway dashboard
2. Click **"New Project"** (big button)
3. Select **"Deploy from GitHub repo"**
4. You'll see a list of your GitHub repositories
5. Find and click on **"DallasCourier"** (or whatever you named it)

### 1.3 Configure Backend Service

Railway will start deploying automatically, but we need to configure it:

1. Railway creates a service automatically - click on it
2. Click the **"Settings"** tab (gear icon)
3. Find **"Root Directory"** section
4. Click **"Edit"** and type: `server`
5. Click **"Save"**

### 1.4 Add Environment Variables

1. Still in Settings, click the **"Variables"** tab
2. Click **"New Variable"** to add these one by one:

   **Variable 1:**
   - **Name**: `JWT_SECRET`
   - **Value**: Click "Generate" or type a random string like `my-super-secret-key-12345`
   - Click **"Add"**

   **Variable 2:**
   - **Name**: `CLIENT_URL`
   - **Value**: Leave this empty for now (we'll add it after frontend deploys)
   - Click **"Add"**

3. **Don't add PORT** - Railway sets this automatically

### 1.5 Get Your Backend URL

1. Go back to the **"Settings"** tab
2. Scroll down to **"Networking"** section
3. Find **"Public Domain"** 
4. Click **"Generate Domain"** if you don't see one
5. **Copy this URL** - you'll need it! 
   - It looks like: `https://dallas-courier-backend-production.up.railway.app`
6. Save this URL somewhere (notepad, notes app, etc.)

✅ **Backend is deploying!** Wait 1-2 minutes for it to finish. You'll see "Deploy Successful" when done.

---

## 🎨 STEP 2: Deploy Frontend to Vercel

**Why Vercel?** It's made by the Next.js team - perfect for Next.js apps!

### 2.1 Create Vercel Account

1. Go to **https://vercel.com**
2. Click **"Sign Up"** or **"Log In"**
3. Choose **"Continue with GitHub"** (easiest option)
4. Authorize Vercel to access your GitHub account

### 2.2 Import Your Project

1. After logging in, you'll see the Vercel dashboard
2. Click **"Add New..."** button → **"Project"**
3. You'll see a list of your GitHub repositories
4. Find **"DallasCourier"** and click **"Import"**

### 2.3 Configure Frontend Project

Vercel will try to auto-detect settings. We need to adjust:

1. **Framework Preset**: Should say "Next.js" (if not, select it)
2. **Root Directory**: 
   - Click **"Edit"** next to "Root Directory"
   - Click **"Other"** 
   - Type: `client`
   - Click **"Continue"**
3. **Build and Output Settings**: Leave as default (Vercel knows Next.js)

### 2.4 Add Environment Variable

1. Scroll down to **"Environment Variables"** section
2. Click **"Add"** or the input field
3. Add this variable:
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: Paste your Railway backend URL from Step 1.5
     - Example: `https://dallas-courier-backend-production.up.railway.app`
   - Make sure it's added to **"Production"** (check the checkbox)
4. Click **"Add"**

### 2.5 Deploy!

1. Scroll down and click the big **"Deploy"** button
2. Wait 1-2 minutes - Vercel will:
   - Install dependencies
   - Build your Next.js app
   - Deploy it
3. When you see **"Congratulations!"** - you're done!
4. **Copy your frontend URL** - it looks like: `https://dallas-courier.vercel.app`
5. Save this URL!

✅ **Frontend is live!** But we need to connect it to the backend...

---

## 🔗 STEP 3: Connect Frontend and Backend

### 3.1 Update Backend CORS Settings

1. Go back to **Railway dashboard** (https://railway.app)
2. Click on your backend service
3. Go to **"Variables"** tab
4. Find the `CLIENT_URL` variable
5. Click **"Edit"** (or the pencil icon)
6. Paste your **Vercel frontend URL** from Step 2.5
   - Example: `https://dallas-courier.vercel.app`
7. Click **"Save"** or **"Update"**
8. Railway will automatically redeploy (takes ~30 seconds)

### 3.2 Verify Everything Works

1. Open your **Vercel frontend URL** in a browser
2. You should see the login page!
3. Try logging in:
   - **Admin**: `admin@demo.com` / `admin123`
   - **Driver**: `driver@demo.com` / `driver123`

If it works - **🎉 Congratulations! Your app is live!**

---

## 🐛 Troubleshooting

### "Cannot connect to backend" error?
- Check that `NEXT_PUBLIC_API_URL` in Vercel matches your Railway URL exactly
- Check that `CLIENT_URL` in Railway matches your Vercel URL exactly
- Make sure both services show "Deployed" status

### Frontend shows errors?
- Check Vercel deployment logs: Click your project → "Deployments" → Click latest → "Logs"
- Make sure Root Directory is set to `client` in Vercel

### Backend not working?
- Check Railway logs: Click your service → "Deployments" → Click latest → "View Logs"
- Make sure Root Directory is set to `server` in Railway
- Verify environment variables are set correctly

### Need help?
- Railway docs: https://docs.railway.app
- Vercel docs: https://vercel.com/docs

---

## ✅ You're Done!

Your app URLs:
- **Frontend**: Your Vercel URL
- **Backend**: Your Railway URL

**Demo Login:**
- Admin: `admin@demo.com` / `admin123`
- Driver: `driver@demo.com` / `driver123`

---

## 🔄 Future Updates

When you make code changes:
1. Push to GitHub: `git push`
2. Both Vercel and Railway will automatically redeploy!
3. No manual steps needed - it's magic! ✨

