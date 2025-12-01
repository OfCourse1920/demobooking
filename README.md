# Restaurant Booking System

A comprehensive restaurant reservation and table management system with real-time availability, multi-channel bookings, and advanced analytics.

## Features

### Core Booking Engine
- ✅ Real-time table availability
- ✅ Floor plan management
- ✅ Table combinations & splitting
- ✅ Multiple booking channels (Website, Mobile, Google Reserve, Social Media, Phone)
- ✅ Booking buffer time between reservations
- ✅ Minimum & maximum party size per table
- ✅ Booking deposit / pre-payment
- ✅ No-show protection

### Customer-Facing Features
- ✅ Beautiful, responsive UI
- ✅ Instant search by date, time, party size
- ✅ Interactive floor plan
- ✅ Special requests
- ✅ Guest profile & booking history
- ✅ Waitlist support
- ✅ Email & SMS confirmations
- ✅ Calendar sync
- ✅ Reviews & ratings
- ✅ Loyalty points
- ✅ Multi-language support
- ✅ Dark/Light mode

### Restaurant Dashboard
- ✅ Live table status grid
- ✅ Timeline view
- ✅ Drag-and-drop reservation management
- ✅ Walk-in management
- ✅ Turn-time tracking
- ✅ Server/section assignment
- ✅ VIP & guest notes
- ✅ No-show & cancellation tracking
- ✅ Daily reports

### Advanced Features
- ✅ Shift management
- ✅ Opening/closing hours & special hours
- ✅ Special events & private dining
- ✅ Recurring bookings
- ✅ Capacity pacing
- ✅ Online menu preview
- ✅ Pre-order food & beverages
- ✅ POS integration ready
- ✅ Kitchen display system sync

### Payments & Deposits
- ✅ Stripe integration
- ✅ Configurable deposit
- ✅ Refund management
- ✅ Gift card & voucher support

### Communication & Marketing
- ✅ Automated email reminders
- ✅ Post-visit feedback requests
- ✅ Abandoned booking recovery
- ✅ Promo codes & campaigns
- ✅ Email marketing

### Analytics & Reporting
- ✅ Occupancy rate
- ✅ No-show rate
- ✅ Revenue per available seat hour (RevPASH)
- ✅ Channel performance
- ✅ Customer lifetime value
- ✅ Export to CSV/Excel/PDF

## Tech Stack

- **Framework**: Next.js 14 (App Router) - Static/Server Components
- **Language**: TypeScript
- **Backend**: Supabase (PostgreSQL, Auth, Real-time, Storage)
- **Database**: PostgreSQL (managed by Supabase)
- **Authentication**: Supabase Auth (Email, OAuth)
- **Payments**: Stripe (client-side integration)
- **UI**: Tailwind CSS + Radix UI
- **State Management**: Zustand + React Query
- **Real-time**: Supabase Realtime Subscriptions

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase account (free tier available)
- Stripe account (for payments) - optional

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd DemoBooking
```

2. Install dependencies:
```bash
npm install
```

3. Create a Supabase project:
   - Go to https://supabase.com
   - Create a new project
   - Note your project URL and anon key

4. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
- Stripe keys (optional)

5. Set up the database:
   - Open Supabase Dashboard → SQL Editor
   - Run the migration: `supabase/migrations/001_initial_schema.sql`
   - Verify tables are created

6. Configure Authentication:
   - In Supabase Dashboard → Authentication → Providers
   - Enable Email provider
   - Enable Google OAuth (optional)

7. Run the development server:
```bash
npm run dev
```

8. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── book/              # Customer booking page
│   ├── dashboard/         # Restaurant dashboard
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── booking/           # Booking flow components
│   ├── dashboard/         # Dashboard components
│   └── ui/                # UI component library
├── lib/                   # Utilities and configurations
│   ├── supabase/          # Supabase clients (browser, server, middleware)
│   ├── services/          # Business logic (bookings, tables, availability)
│   └── utils.ts           # Helper functions
├── supabase/              # Supabase migrations
│   └── migrations/        # SQL migration files
└── middleware.ts          # Next.js middleware for auth
```

## Database Schema

The system uses PostgreSQL with Supabase, including tables for:
- Users & Authentication (extends Supabase auth.users)
- Restaurants & Locations
- Tables & Floors
- Bookings & Reservations
- Payments
- Staff & Roles
- Reviews & Ratings
- Loyalty Points
- Waitlist
- Integrations
- And more...

See `supabase/migrations/001_initial_schema.sql` for the complete schema.

## Service Functions

Instead of API routes, the app uses Supabase client calls via service functions:
- `lib/services/bookings.ts` - Create and fetch bookings
- `lib/services/availability.ts` - Check table availability
- `lib/services/tables.ts` - Get tables and availability

All database operations happen client-side using Supabase's secure client.

## Development

### Database Migrations

1. Create a new SQL migration file in `supabase/migrations/`
2. Run the migration in Supabase Dashboard → SQL Editor
3. Update TypeScript types in `lib/supabase/types.ts` (or use Supabase CLI to generate)

### Adding New Features

1. Create/update SQL migration if database changes needed
2. Create service functions in `lib/services/` using Supabase client
3. Build UI components
4. Use service functions in components
5. Add to dashboard or customer-facing pages

### Real-time Subscriptions

```typescript
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()
const channel = supabase
  .channel('bookings')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'bookings' },
    (payload) => {
      // Handle real-time updates
    }
  )
  .subscribe()
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- AWS
- Google Cloud
- Azure
- DigitalOcean
- Railway
- Render

## Security

- ✅ GDPR & CCPA compliance ready
- ✅ PCI-DSS compliant payment processing (via Stripe)
- ✅ SSL encryption
- ✅ Secure authentication
- ✅ Role-based access control
- ✅ Audit logging

## Support

For issues, questions, or contributions, please open an issue on GitHub.

## License

MIT License

