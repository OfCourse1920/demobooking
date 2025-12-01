# Setup Guide - Supabase Version

## Quick Start

1. **Create Supabase Project**
   - Go to https://supabase.com
   - Create a new project
   - Note your project URL and anon key

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Set Up Database**
   - In Supabase Dashboard, go to SQL Editor
   - Run the migration file: `supabase/migrations/001_initial_schema.sql`
   - This will create all necessary tables

5. **Configure Authentication**
   - In Supabase Dashboard → Authentication → Providers
   - Enable Email provider
   - Enable Google OAuth (optional)
   - Configure redirect URLs

6. **Run Development Server**
   ```bash
   npm run dev
   ```

7. **Open Browser**
   Navigate to http://localhost:3000

## Supabase Setup Details

### Database Migration

1. Open Supabase Dashboard
2. Go to SQL Editor
3. Copy and paste the contents of `supabase/migrations/001_initial_schema.sql`
4. Run the migration
5. Verify tables are created in Table Editor

### Authentication Setup

1. **Email Auth**
   - Go to Authentication → Providers
   - Enable Email provider
   - Configure email templates (optional)

2. **Google OAuth** (Optional)
   - Go to Authentication → Providers
   - Enable Google
   - Add your Google OAuth credentials
   - Add redirect URL: `http://localhost:3000/auth/callback`

3. **Row Level Security (RLS)**
   - RLS policies are included in the migration
   - Customize policies in Supabase Dashboard → Authentication → Policies

### Seeding Demo Data

You can seed demo data using Supabase SQL Editor:

```sql
-- Insert demo restaurant
INSERT INTO public.restaurants (
  id, name, slug, address, city, country, phone, email,
  booking_buffer_minutes, min_party_size, max_party_size
) VALUES (
  'demo-restaurant',
  'The Fine Dining Restaurant',
  'fine-dining',
  '123 Main Street',
  'New York',
  'USA',
  '+1 (555) 123-4567',
  'info@finedining.com',
  15, 1, 20
);

-- Insert demo tables
INSERT INTO public.tables (restaurant_id, name, number, capacity, status)
SELECT 
  'demo-restaurant',
  'Table ' || generate_series,
  generate_series,
  CASE 
    WHEN generate_series <= 5 THEN 2
    WHEN generate_series <= 10 THEN 4
    WHEN generate_series <= 15 THEN 6
    ELSE 8
  END,
  'AVAILABLE'
FROM generate_series(1, 20);
```

## Stripe Setup (Optional)

If you want payment functionality:

1. Create a Stripe account at https://stripe.com
2. Get your API keys from the dashboard
3. Add to `.env`:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   ```
4. Set up webhook in Stripe Dashboard
5. Use Supabase Edge Functions for webhook handling (optional)

## Key Differences from Node.js Backend

### No API Routes Needed
- All database operations use Supabase client directly
- No need for `/api` routes
- Client-side and server-side Supabase clients available

### Authentication
- Uses Supabase Auth instead of NextAuth
- Built-in email/password and OAuth support
- Session management handled by Supabase

### Real-time Features
- Supabase provides real-time subscriptions
- No need for Socket.io
- Use `supabase.from('table').on('*', callback)` for live updates

### Database
- PostgreSQL managed by Supabase
- No Prisma needed
- Use Supabase client for queries
- Migrations via SQL in Supabase Dashboard

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── book/              # Customer booking page
│   └── dashboard/         # Restaurant dashboard
├── components/            # React components
│   ├── booking/           # Booking flow components
│   ├── dashboard/          # Dashboard components
│   └── ui/                # UI component library
├── lib/                   # Utilities
│   ├── supabase/          # Supabase clients
│   └── services/           # Business logic (bookings, tables, etc.)
├── supabase/              # Supabase migrations
│   └── migrations/        # SQL migration files
└── middleware.ts          # Next.js middleware for auth
```

## Development

### Adding New Features

1. **Database Changes**
   - Create new migration SQL file
   - Run in Supabase SQL Editor
   - Update TypeScript types in `lib/supabase/types.ts`

2. **New Service Functions**
   - Create in `lib/services/`
   - Use Supabase client for database operations
   - Export functions for use in components

3. **Real-time Subscriptions**
   ```typescript
   const supabase = createClient()
   const channel = supabase
     .channel('bookings')
     .on('postgres_changes', 
       { event: '*', schema: 'public', table: 'bookings' },
       (payload) => {
         console.log('Change received!', payload)
       }
     )
     .subscribe()
   ```

## Production Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

### Environment Variables for Production

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
- Update Supabase redirect URLs to include your production domain

## Troubleshooting

### Database Connection Issues

- Verify Supabase project is active
- Check environment variables are set correctly
- Verify RLS policies allow your operations

### Authentication Issues

- Check redirect URLs in Supabase Dashboard
- Verify OAuth providers are configured
- Check browser console for errors

### Type Errors

- Update `lib/supabase/types.ts` after schema changes
- Use Supabase CLI to generate types: `npx supabase gen types typescript --project-id your-project-id > lib/supabase/types.ts`

## Benefits of Supabase Approach

✅ **No Backend Server Needed** - Everything runs client-side or via Supabase
✅ **Built-in Authentication** - Email, OAuth, magic links
✅ **Real-time by Default** - Subscriptions for live updates
✅ **Automatic API** - REST and GraphQL APIs generated automatically
✅ **Scalable** - Supabase handles scaling
✅ **Type Safety** - TypeScript types from database schema
✅ **Row Level Security** - Built-in security policies
