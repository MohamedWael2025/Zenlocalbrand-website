# 🚀 Deploy to Render - Step by Step Guide

## Quick Setup (5 minutes)

### Step 1: Sign Up
1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with your GitHub account

### Step 2: Create New Web Service
1. Click "New +" button (top right)
2. Select "Web Service"

### Step 3: Connect GitHub Repository
1. Click "Connect account" if not already connected
2. Authorize Render to access your repositories
3. Search for: `Zenlocalbrand-website`
4. Click "Connect"

### Step 4: Configure Service
Render will auto-detect your `render.yaml` file! ✅

**Settings (auto-filled from render.yaml):**
- **Name**: `zenlocalbrand` (or your choice)
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Runtime**: Docker (auto-detected)
- **Dockerfile Path**: `./Dockerfile` (auto-detected)

### Step 5: Environment Variables
Your `render.yaml` already sets these, but you can add more if needed:

```
ASPNETCORE_ENVIRONMENT=Production
ASPNETCORE_URLS=http://+:10000
```

### Step 6: Deploy!
1. Click "Create Web Service"
2. Render will:
   - Build your Docker image
   - Deploy your application
   - Give you a URL like: `https://zenlocalbrand.onrender.com`

### Step 7: Wait for Deployment
- First deployment takes 5-10 minutes
- You'll see build logs in real-time
- When done, your site will be live!

---

## ✅ That's It!

Your app is now live at: `https://zenlocalbrand.onrender.com`

---

## 🔄 Auto-Deploy on Git Push

Render automatically deploys when you push to `main` branch!

Just push your changes:
```bash
git push origin main
```

Render will automatically rebuild and redeploy.

---

## 💰 Free Tier Limits

- **750 hours/month** (enough for 24/7 on one service)
- **512 MB RAM**
- **0.5 CPU**
- Services spin down after 15 minutes of inactivity (free tier)
- First request after spin-down takes ~30 seconds

**Upgrade to paid plan** for:
- Always-on services
- More resources
- Better performance

---

## 🔧 Troubleshooting

### Service won't start?
1. Check build logs in Render dashboard
2. Verify Dockerfile is correct
3. Check environment variables

### Database issues?
- Your SQLite database is stored in `/app/data`
- Render mounts a disk volume automatically (from render.yaml)

### Port issues?
- Your app listens on port 10000 (from render.yaml)
- Render automatically routes traffic to this port

---

## 📝 Next Steps

1. **Set up custom domain** (optional):
   - Go to your service → Settings → Custom Domains
   - Add your domain

2. **Set up environment variables** for production:
   - Go to Environment tab
   - Add any secrets (API keys, etc.)

3. **Monitor your app**:
   - View logs in real-time
   - Check metrics and performance

---

## 🎉 Success!

Your ZEN e-commerce site is now live on Render!
