-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enums
CREATE TYPE user_role AS ENUM ('CUSTOMER', 'HOST', 'SERVER', 'MANAGER', 'ADMIN');
CREATE TYPE booking_status AS ENUM ('PENDING', 'CONFIRMED', 'SEATED', 'COMPLETED', 'CANCELLED', 'NO_SHOW');
CREATE TYPE table_status AS ENUM ('AVAILABLE', 'BOOKED', 'SEATED', 'DIRTY', 'RESERVED', 'OUT_OF_SERVICE');
CREATE TYPE payment_status AS ENUM ('PENDING', 'COMPLETED', 'REFUNDED', 'FAILED');
CREATE TYPE channel AS ENUM ('WEBSITE', 'MOBILE_APP', 'GOOGLE_RESERVE', 'INSTAGRAM', 'FACEBOOK', 'PHONE', 'WALK_IN');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  phone TEXT,
  image TEXT,
  email_verified TIMESTAMPTZ,
  role user_role DEFAULT 'CUSTOMER',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Restaurants table
CREATE TABLE public.restaurants (
  id TEXT PRIMARY KEY DEFAULT 'res_' || substr(md5(random()::text), 0, 10),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT,
  zip_code TEXT,
  country TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  website TEXT,
  logo TEXT,
  cover_image TEXT,
  cuisine TEXT,
  price_range INTEGER,
  time_zone TEXT DEFAULT 'UTC',
  monday_open TEXT,
  monday_close TEXT,
  tuesday_open TEXT,
  tuesday_close TEXT,
  wednesday_open TEXT,
  wednesday_close TEXT,
  thursday_open TEXT,
  thursday_close TEXT,
  friday_open TEXT,
  friday_close TEXT,
  saturday_open TEXT,
  saturday_close TEXT,
  sunday_open TEXT,
  sunday_close TEXT,
  booking_buffer_minutes INTEGER DEFAULT 15,
  min_party_size INTEGER DEFAULT 1,
  max_party_size INTEGER DEFAULT 20,
  require_deposit BOOLEAN DEFAULT false,
  deposit_amount DECIMAL(10,2),
  deposit_percentage DECIMAL(5,2),
  no_show_policy TEXT,
  cancellation_policy TEXT,
  allow_table_selection BOOLEAN DEFAULT true,
  allow_pre_order BOOLEAN DEFAULT false,
  allow_waitlist BOOLEAN DEFAULT true,
  multi_language BOOLEAN DEFAULT false,
  languages TEXT[] DEFAULT ARRAY[]::TEXT[],
  primary_color TEXT,
  secondary_color TEXT,
  font_family TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Floors table
CREATE TABLE public.floors (
  id TEXT PRIMARY KEY DEFAULT 'floor_' || substr(md5(random()::text), 0, 10),
  restaurant_id TEXT NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  level INTEGER DEFAULT 1,
  floor_plan JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_floors_restaurant_id ON public.floors(restaurant_id);

-- Tables table
CREATE TABLE public.tables (
  id TEXT PRIMARY KEY DEFAULT 'table_' || substr(md5(random()::text), 0, 10),
  restaurant_id TEXT NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
  floor_id TEXT REFERENCES public.floors(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  number INTEGER NOT NULL,
  capacity INTEGER NOT NULL,
  min_party_size INTEGER,
  x DECIMAL(10,2),
  y DECIMAL(10,2),
  shape TEXT,
  status table_status DEFAULT 'AVAILABLE',
  section TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tables_restaurant_id ON public.tables(restaurant_id);
CREATE INDEX idx_tables_floor_id ON public.tables(floor_id);
CREATE INDEX idx_tables_status ON public.tables(status);

-- Bookings table
CREATE TABLE public.bookings (
  id TEXT PRIMARY KEY DEFAULT 'booking_' || substr(md5(random()::text), 0, 10),
  restaurant_id TEXT NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  table_id TEXT REFERENCES public.tables(id) ON DELETE SET NULL,
  status booking_status DEFAULT 'PENDING',
  channel channel DEFAULT 'WEBSITE',
  party_size INTEGER NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  duration INTEGER DEFAULT 120,
  special_requests TEXT,
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT NOT NULL,
  notes TEXT,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  is_walk_in BOOLEAN DEFAULT false,
  seated_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  cancellation_reason TEXT,
  no_show_at TIMESTAMPTZ,
  deposit_amount DECIMAL(10,2),
  deposit_paid BOOLEAN DEFAULT false,
  total_amount DECIMAL(10,2),
  payment_status payment_status DEFAULT 'PENDING',
  pre_order_items JSONB,
  calendar_event_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_bookings_restaurant_id ON public.bookings(restaurant_id);
CREATE INDEX idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX idx_bookings_table_id ON public.bookings(table_id);
CREATE INDEX idx_bookings_date ON public.bookings(date);
CREATE INDEX idx_bookings_status ON public.bookings(status);
CREATE INDEX idx_bookings_channel ON public.bookings(channel);

-- Payments table
CREATE TABLE public.payments (
  id TEXT PRIMARY KEY DEFAULT 'payment_' || substr(md5(random()::text), 0, 10),
  booking_id TEXT NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  status payment_status DEFAULT 'PENDING',
  stripe_payment_id TEXT UNIQUE,
  refund_amount DECIMAL(10,2),
  refunded_at TIMESTAMPTZ,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_payments_booking_id ON public.payments(booking_id);
CREATE INDEX idx_payments_stripe_payment_id ON public.payments(stripe_payment_id);

-- Add more tables as needed (Staff, Shifts, Reviews, etc.)
-- This is a simplified version - add remaining tables based on your Prisma schema

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tables ENABLE ROW LEVEL SECURITY;

-- RLS Policies (basic - customize as needed)
CREATE POLICY "Users can view own data" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Anyone can view restaurants" ON public.restaurants
  FOR SELECT USING (true);

CREATE POLICY "Users can view own bookings" ON public.bookings
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can create bookings" ON public.bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view tables" ON public.tables
  FOR SELECT USING (true);

