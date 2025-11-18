# ✅ Deployment Checklist

## Step 1: Railway Backend Deployment

### 1.1 Create Account
- [ ] Go to https://railway.app
- [ ] Click "Start a New Project" or "Login"
- [ ] Sign up with GitHub (click "Login with GitHub")
- [ ] Authorize Railway to access your GitHub

### 1.2 Create Project
- [ ] Click "New Project"
- [ ] Select "Deploy from GitHub repo"
- [ ] Find and click "DallasCourier" repository
- [ ] Railway will start deploying automatically

### 1.3 Configure Service
- [ ] Click on the service that was created
- [ ] Go to "Settings" tab (gear icon)
- [ ] Find "Root Directory" section
- [ ] Click "Edit" and type: `server`
- [ ] Click "Save"

### 1.4 Add Environment Variables
- [ ] Go to "Variables" tab in Settings
- [ ] Click "New Variable"
- [ ] Add `JWT_SECRET`:
  - Name: `JWT_SECRET`
  - Value: Click "Generate" or type a random string like `my-secret-key-12345`
  - Click "Add"
- [ ] Add `CLIENT_URL`:
  - Name: `CLIENT_URL`
  - Value: Leave empty for now (we'll add after frontend deploys)
  - Click "Add"

### 1.5 Get Backend URL
- [ ] Go back to "Settings" tab
- [ ] Scroll to "Networking" section
- [ ] Find "Public Domain"
- [ ] Click "Generate Domain" if needed
- [ ] **COPY THIS URL** - Save it somewhere!
  - Looks like: `https://dallas-courier-backend-production.up.railway.app`

✅ **Backend deploying!** Wait 1-2 minutes for "Deploy Successful"

---

## Step 2: Vercel Frontend Deployment

### 2.1 Create Account
- [ ] Go to https://vercel.com
- [ ] Click "Sign Up" or "Log In"
- [ ] Choose "Continue with GitHub"
- [ ] Authorize Vercel to access your GitHub

### 2.2 Import Project
- [ ] Click "Add New..." → "Project"
- [ ] Find "DallasCourier" and click "Import"

### 2.3 Configure Project
- [ ] Framework Preset: Should say "Next.js" (if not, select it)
- [ ] Root Directory: 
  - Click "Edit" next to "Root Directory"
  - Click "Other"
  - Type: `client`
  - Click "Continue"

### 2.4 Add Environment Variable
- [ ] Scroll to "Environment Variables" section
- [ ] Click "Add"
- [ ] Add variable:
  - Name: `NEXT_PUBLIC_API_URL`
  - Value: Paste your Railway backend URL from Step 1.5
  - Make sure "Production" is checked
  - Click "Add"

### 2.5 Deploy
- [ ] Scroll down and click "Deploy"
- [ ] Wait 1-2 minutes for deployment
- [ ] When you see "Congratulations!" - you're done!
- [ ] **COPY YOUR FRONTEND URL** - Save it!
  - Looks like: `https://dallas-courier.vercel.app`

✅ **Frontend is live!**

---

## Step 3: Connect Frontend and Backend

### 3.1 Update Backend CORS
- [ ] Go back to Railway dashboard
- [ ] Click on your backend service
- [ ] Go to "Variables" tab
- [ ] Find `CLIENT_URL` variable
- [ ] Click "Edit"
- [ ] Paste your Vercel frontend URL from Step 2.5
- [ ] Click "Save"
- [ ] Railway will auto-redeploy (30 seconds)

### 3.2 Test Your App
- [ ] Open your Vercel frontend URL in browser
- [ ] You should see the login page!
- [ ] Try logging in:
  - Admin: `admin@demo.com` / `admin123`
  - Driver: `driver@demo.com` / `driver123`

🎉 **Your app is live!**

---

## Your Live URLs:
- Frontend: _________________________
- Backend: _________________________

