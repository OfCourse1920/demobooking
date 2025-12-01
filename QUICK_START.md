# Quick Start Guide

## Your Supabase Credentials (Already Configured)

✅ **Supabase URL:** `https://xfizredatnevjsygiviw.supabase.co`  
✅ **API Key:** Already set in `.env.local`

## Step 1: Set Up Database (5 minutes)

1. Go to https://supabase.com/dashboard
2. Select your project
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**
5. Open the file: `supabase/migrations/001_initial_schema.sql`
6. Copy ALL the SQL code
7. Paste it into the Supabase SQL Editor
8. Click **Run** (or press Ctrl+Enter)
9. ✅ You should see "Success. No rows returned"

## Step 2: Configure Authentication (2 minutes)

1. In Supabase Dashboard → **Authentication** → **Providers**
2. Enable **Email** provider (toggle it on)
3. (Optional) Enable **Google** for OAuth login
4. Save changes

## Step 3: Deploy to Vercel (No Node.js Needed!)

### Option A: Deploy via GitHub (Recommended)

1. **Create GitHub Repository:**
   - Go to https://github.com/new
   - Create a new repository
   - Don't initialize with README

2. **Push Your Code:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

3. **Deploy to Vercel:**
   - Go to https://vercel.com
   - Sign up with GitHub
   - Click **"Add New Project"**
   - Import your GitHub repository
   - Vercel will auto-detect Next.js
   - Add environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL` = `https://xfizredatnevjsygiviw.supabase.co`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmaXpyZWRhdG5ldmpzeWdpdml3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1NjQwNzQsImV4cCI6MjA4MDE0MDA3NH0.sQi6pglF1FCI38kwQUbKE1ZB5a5HD5UzGp8Nq32euYg`
   - Click **"Deploy"**
   - Wait 2-3 minutes
   - ✅ Your app is live!

### Option B: Deploy via Vercel CLI (If you have Node.js)

```bash
npm i -g vercel
vercel
```

### Option C: Use StackBlitz (Instant, No Setup)

1. Go to https://stackblitz.com
2. Click **"Import from GitHub"**
3. Paste your repo URL
4. StackBlitz runs everything instantly in your browser!

## Step 4: Test Your App

Once deployed:

1. Visit your Vercel URL (e.g., `https://your-app.vercel.app`)
2. Test booking: Go to `/book`
3. Test dashboard: Go to `/dashboard` (sign in first)
4. Sign up: Go to `/auth/signin`

## What You Get

✅ **Free Hosting** - Vercel (unlimited for personal projects)  
✅ **Free Database** - Supabase (500MB free tier)  
✅ **No Node.js Needed** - Everything runs in the cloud  
✅ **Auto Deployments** - Push to GitHub = auto deploy  
✅ **SSL Certificate** - HTTPS included  
✅ **Global CDN** - Fast worldwide  

## Need Help?

- **Database Issues?** Check Supabase Dashboard → Table Editor
- **Auth Issues?** Check Supabase Dashboard → Authentication → Users
- **Build Errors?** Check Vercel Dashboard → Deployments → Logs

## Next Steps

1. ✅ Database setup - Done via SQL migration
2. ✅ Authentication - Configured in Supabase
3. ✅ Deployment - Push to GitHub + Vercel
4. 🎉 Your restaurant booking system is live!

---

**Total Time:** ~10 minutes  
**Cost:** $0 (completely free)  
**Node.js Required:** ❌ No!

