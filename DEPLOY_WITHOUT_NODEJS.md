# Deploy Without Installing Node.js Locally

Since Next.js requires Node.js, you have several options to run this project without installing Node.js on your local machine:

## Option 1: Deploy to Vercel (Recommended - Easiest)

Vercel is free and handles all Node.js setup for you:

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to https://vercel.com
   - Sign up with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL` = `https://xfizredatnevjsygiviw.supabase.co`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmaXpyZWRhdG5ldmpzeWdpdml3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1NjQwNzQsImV4cCI6MjA4MDE0MDA3NH0.sQi6pglF1FCI38kwQUbKE1ZB5a5HD5UzGp8Nq32euYg`
   - Click "Deploy"
   - Your app will be live in 2-3 minutes!

3. **Set up Supabase Database:**
   - Go to your Supabase Dashboard: https://supabase.com/dashboard
   - Open SQL Editor
   - Copy and paste the contents of `supabase/migrations/001_initial_schema.sql`
   - Run the migration
   - Your database is ready!

## Option 2: Use GitHub Codespaces (Free)

Run the project in a browser-based VS Code environment:

1. Push your code to GitHub
2. Go to your repository on GitHub
3. Click the green "Code" button
4. Select "Codespaces" → "Create codespace"
5. Wait for the environment to load
6. In the terminal, run:
   ```bash
   npm install
   npm run dev
   ```
7. The app will be accessible via the forwarded port

## Option 3: Use Replit (Free)

1. Go to https://replit.com
2. Create a new Repl
3. Import from GitHub
4. Replit automatically detects Next.js and installs dependencies
5. Click "Run" - it handles everything!

## Option 4: Use StackBlitz (Free, Instant)

1. Go to https://stackblitz.com
2. Click "Import from GitHub"
3. Paste your repository URL
4. StackBlitz runs everything in your browser instantly
5. No installation needed!

## Option 5: Install Node.js (If you change your mind)

If you want to run locally, Node.js is free and easy to install:

1. **Windows:** Download from https://nodejs.org (LTS version)
2. **Mac:** `brew install node` or download from nodejs.org
3. **Linux:** `sudo apt install nodejs npm`

Then run:
```bash
npm install
npm run dev
```

## Quick Setup Steps (Vercel - Recommended)

### Step 1: Set Up Supabase Database

1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to SQL Editor
4. Create a new query
5. Copy the entire contents of `supabase/migrations/001_initial_schema.sql`
6. Paste and click "Run"
7. Verify tables are created in Table Editor

### Step 2: Configure Supabase Auth

1. In Supabase Dashboard → Authentication → Providers
2. Enable "Email" provider
3. (Optional) Enable "Google" for OAuth
4. Set redirect URL: `https://your-vercel-app.vercel.app/auth/callback`

### Step 3: Deploy to Vercel

1. Push code to GitHub
2. Go to vercel.com
3. Import project
4. Add environment variables (already in `.env.local`)
5. Deploy!

## Environment Variables for Vercel

When deploying, add these in Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://xfizredatnevjsygiviw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmaXpyZWRhdG5ldmpzeWdpdml3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1NjQwNzQsImV4cCI6MjA4MDE0MDA3NH0.sQi6pglF1FCI38kwQUbKE1ZB5a5HD5UzGp8Nq32euYg
```

## Testing Your Deployment

Once deployed:

1. Visit your Vercel URL (e.g., `https://your-app.vercel.app`)
2. Go to `/book` to test booking flow
3. Go to `/dashboard` to test dashboard (requires auth)
4. Sign up at `/auth/signin`

## Troubleshooting

### Database Connection Issues
- Verify Supabase project is active
- Check environment variables are set correctly
- Ensure migration SQL has been run

### Authentication Not Working
- Check redirect URLs in Supabase Dashboard
- Verify OAuth providers are configured
- Check browser console for errors

### Build Errors
- Check Vercel build logs
- Ensure all dependencies are in `package.json`
- Verify TypeScript types are correct

## Recommended: Vercel + Supabase

This combination gives you:
- ✅ Free hosting (Vercel)
- ✅ Free database (Supabase)
- ✅ Automatic deployments from GitHub
- ✅ No local Node.js needed
- ✅ Production-ready setup
- ✅ SSL certificates included
- ✅ Global CDN

Your app will be live and accessible from anywhere!

