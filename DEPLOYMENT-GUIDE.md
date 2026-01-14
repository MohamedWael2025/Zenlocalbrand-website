# ZEN E-Commerce Deployment Guide

## 🚀 Recommended Deployment Platforms

Your ASP.NET Core application requires a .NET runtime, so these platforms are recommended:

### 1. **Render** (Recommended - You already have config! ✅)

**Why Render?**
- Free tier available
- Native .NET Core support
- Docker-based deployment
- Already configured in `render.yaml`

**Steps:**
1. Go to [render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `MohamedWael2025/Zenlocalbrand-website`
4. Render will auto-detect `render.yaml` and configure everything
5. Set environment variables if needed:
   - `ASPNETCORE_ENVIRONMENT=Production`
   - `ASPNETCORE_URLS=http://+:10000`
6. Deploy!

**Your render.yaml is already configured!** Just connect the repo.

---

### 2. **Fly.io** (You already have config! ✅)

**Why Fly.io?**
- Global edge deployment
- Free tier available
- Fast cold starts
- Already configured in `fly.toml`

**Steps:**
1. Install Fly CLI: `iwr https://fly.io/install.ps1 -useb | iex` (PowerShell)
2. Sign up: `fly auth signup`
3. Launch app: `fly launch` (it will detect `fly.toml`)
4. Deploy: `fly deploy`

---

### 3. **Azure App Service** (Best for .NET)

**Why Azure?**
- Microsoft's platform (perfect for .NET)
- Free tier available
- Easy deployment from GitHub
- Built-in CI/CD

**Steps:**
1. Go to [portal.azure.com](https://portal.azure.com)
2. Create "App Service" → "Web App"
3. Select:
   - Runtime: .NET 8
   - OS: Linux (or Windows)
4. Connect to GitHub and select your repo
5. Deploy!

---

### 4. **Railway** (Simple & Fast)

**Why Railway?**
- Very simple setup
- Free tier with $5 credit
- Auto-detects .NET projects

**Steps:**
1. Go to [railway.app](https://railway.app)
2. "New Project" → "Deploy from GitHub"
3. Select your repository
4. Railway auto-detects .NET and deploys!

---

## ❌ Why NOT Netlify?

Netlify is designed for:
- Static sites (HTML/CSS/JS)
- JAMstack applications
- Serverless functions (Node.js, Go, etc.)

**Netlify does NOT support:**
- .NET Core runtime
- Full ASP.NET Core MVC applications
- Server-side rendering with .NET

**Your app needs:**
- .NET 8 runtime
- Server-side processing
- Database connections
- Authentication middleware

---

## 🔧 Quick Setup for Render (Recommended)

Since you already have `render.yaml`, here's the fastest path:

1. **Sign up at Render**: https://render.com
2. **New Web Service** → Connect GitHub
3. **Select Repository**: `MohamedWael2025/Zenlocalbrand-website`
4. **Render auto-detects** your `render.yaml` ✅
5. **Click Deploy** - That's it!

Your `render.yaml` already has:
- Docker configuration
- Environment variables
- Port settings
- Disk mount for SQLite database

---

## 📝 Environment Variables

If you need to set additional environment variables:

**For Render:**
- Go to your service → Environment
- Add variables as needed

**Common variables:**
```
ASPNETCORE_ENVIRONMENT=Production
ASPNETCORE_URLS=http://+:10000
ConnectionStrings__DefaultConnection=your_connection_string
```

---

## 🐳 Docker Deployment

Your `Dockerfile` is already configured! It:
- Uses .NET 8 SDK for building
- Uses .NET 8 runtime for production
- Exposes port 8080
- Sets up data directory for SQLite

---

## ✅ Recommended: Use Render

**Your best option is Render because:**
1. ✅ You already have `render.yaml` configured
2. ✅ Free tier available
3. ✅ Native .NET support
4. ✅ Easy GitHub integration
5. ✅ Auto-deploy on push

**Just connect your GitHub repo and deploy!**

---

## 🆘 Need Help?

If you encounter issues:
1. Check the deployment logs
2. Verify environment variables
3. Ensure database connection strings are set
4. Check that port configuration matches

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [Fly.io Documentation](https://fly.io/docs)
- [Azure App Service Docs](https://docs.microsoft.com/azure/app-service)
- [Railway Documentation](https://docs.railway.app)
