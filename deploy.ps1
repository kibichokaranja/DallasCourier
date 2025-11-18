# Deployment Script for Dallas Courier
Write-Host "🚀 Deploying Dallas Courier Demo..." -ForegroundColor Green

Write-Host "`n📦 Frontend Deployment (Vercel):" -ForegroundColor Cyan
Write-Host "1. Go to https://vercel.com/new" -ForegroundColor Yellow
Write-Host "2. Import your Git repository (or connect GitHub)" -ForegroundColor Yellow
Write-Host "3. Set Root Directory to: client" -ForegroundColor Yellow
Write-Host "4. Add Environment Variable:" -ForegroundColor Yellow
Write-Host "   Name: NEXT_PUBLIC_API_URL" -ForegroundColor Yellow
Write-Host "   Value: [Your backend URL from Railway]" -ForegroundColor Yellow
Write-Host "5. Click Deploy" -ForegroundColor Yellow

Write-Host "`n🔧 Backend Deployment (Railway):" -ForegroundColor Cyan
Write-Host "1. Go to https://railway.app/new" -ForegroundColor Yellow
Write-Host "2. Select 'Deploy from GitHub repo' or 'Empty Project'" -ForegroundColor Yellow
Write-Host "3. If empty project, add service and set:" -ForegroundColor Yellow
Write-Host "   - Root Directory: server" -ForegroundColor Yellow
Write-Host "   - Build Command: npm install" -ForegroundColor Yellow
Write-Host "   - Start Command: npm start" -ForegroundColor Yellow
Write-Host "4. Add Environment Variables:" -ForegroundColor Yellow
Write-Host "   - JWT_SECRET: [Generate a secure random string]" -ForegroundColor Yellow
Write-Host "   - CLIENT_URL: [Your Vercel frontend URL]" -ForegroundColor Yellow
Write-Host "5. Deploy and copy the generated URL" -ForegroundColor Yellow

Write-Host "`n✅ After both are deployed:" -ForegroundColor Green
Write-Host "1. Update NEXT_PUBLIC_API_URL in Vercel with Railway backend URL" -ForegroundColor Yellow
Write-Host "2. Update CLIENT_URL in Railway with Vercel frontend URL" -ForegroundColor Yellow
Write-Host "3. Redeploy both services" -ForegroundColor Yellow

Write-Host "`n🌐 Quick Deploy via CLI (if logged in):" -ForegroundColor Cyan
Write-Host "Frontend: cd client; npx vercel --prod" -ForegroundColor Yellow
Write-Host "Backend: cd server; npx @railway/cli up" -ForegroundColor Yellow

