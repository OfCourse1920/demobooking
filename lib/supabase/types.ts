export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          phone: string | null
          image: string | null
          email_verified: string | null
          role: 'CUSTOMER' | 'HOST' | 'SERVER' | 'MANAGER' | 'ADMIN'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          phone?: string | null
          image?: string | null
          email_verified?: string | null
          role?: 'CUSTOMER' | 'HOST' | 'SERVER' | 'MANAGER' | 'ADMIN'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          phone?: string | null
          image?: string | null
          email_verified?: string | null
          role?: 'CUSTOMER' | 'HOST' | 'SERVER' | 'MANAGER' | 'ADMIN'
          created_at?: string
          updated_at?: string
        }
      }
      restaurants: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          address: string
          city: string
          state: string | null
          zip_code: string | null
          country: string
          phone: string
          email: string
          website: string | null
          logo: string | null
          cover_image: string | null
          cuisine: string | null
          price_range: number | null
          time_zone: string
          monday_open: string | null
          monday_close: string | null
          tuesday_open: string | null
          tuesday_close: string | null
          wednesday_open: string | null
          wednesday_close: string | null
          thursday_open: string | null
          thursday_close: string | null
          friday_open: string | null
          friday_close: string | null
          saturday_open: string | null
          saturday_close: string | null
          sunday_open: string | null
          sunday_close: string | null
          booking_buffer_minutes: number
          min_party_size: number
          max_party_size: number
          require_deposit: boolean
          deposit_amount: number | null
          deposit_percentage: number | null
          no_show_policy: string | null
          cancellation_policy: string | null
          allow_table_selection: boolean
          allow_pre_order: boolean
          allow_waitlist: boolean
          multi_language: boolean
          languages: string[]
          primary_color: string | null
          secondary_color: string | null
          font_family: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          address: string
          city: string
          state?: string | null
          zip_code?: string | null
          country: string
          phone: string
          email: string
          website?: string | null
          logo?: string | null
          cover_image?: string | null
          cuisine?: string | null
          price_range?: number | null
          time_zone?: string
          monday_open?: string | null
          monday_close?: string | null
          tuesday_open?: string | null
          tuesday_close?: string | null
          wednesday_open?: string | null
          wednesday_close?: string | null
          thursday_open?: string | null
          thursday_close?: string | null
          friday_open?: string | null
          friday_close?: string | null
          saturday_open?: string | null
          saturday_close?: string | null
          sunday_open?: string | null
          sunday_close?: string | null
          booking_buffer_minutes?: number
          min_party_size?: number
          max_party_size?: number
          require_deposit?: boolean
          deposit_amount?: number | null
          deposit_percentage?: number | null
          no_show_policy?: string | null
          cancellation_policy?: string | null
          allow_table_selection?: boolean
          allow_pre_order?: boolean
          allow_waitlist?: boolean
          multi_language?: boolean
          languages?: string[]
          primary_color?: string | null
          secondary_color?: string | null
          font_family?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          address?: string
          city?: string
          state?: string | null
          zip_code?: string | null
          country?: string
          phone?: string
          email?: string
          website?: string | null
          logo?: string | null
          cover_image?: string | null
          cuisine?: string | null
          price_range?: number | null
          time_zone?: string
          monday_open?: string | null
          monday_close?: string | null
          tuesday_open?: string | null
          tuesday_close?: string | null
          wednesday_open?: string | null
          wednesday_close?: string | null
          thursday_open?: string | null
          thursday_close?: string | null
          friday_open?: string | null
          friday_close?: string | null
          saturday_open?: string | null
          saturday_close?: string | null
          sunday_open?: string | null
          sunday_close?: string | null
          booking_buffer_minutes?: number
          min_party_size?: number
          max_party_size?: number
          require_deposit?: boolean
          deposit_amount?: number | null
          deposit_percentage?: number | null
          no_show_policy?: string | null
          cancellation_policy?: string | null
          allow_table_selection?: boolean
          allow_pre_order?: boolean
          allow_waitlist?: boolean
          multi_language?: boolean
          languages?: string[]
          primary_color?: string | null
          secondary_color?: string | null
          font_family?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          restaurant_id: string
          user_id: string | null
          table_id: string | null
          status: 'PENDING' | 'CONFIRMED' | 'SEATED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW'
          channel: 'WEBSITE' | 'MOBILE_APP' | 'GOOGLE_RESERVE' | 'INSTAGRAM' | 'FACEBOOK' | 'PHONE' | 'WALK_IN'
          party_size: number
          date: string
          time: string
          duration: number
          special_requests: string | null
          guest_name: string
          guest_email: string
          guest_phone: string
          notes: string | null
          tags: string[]
          is_walk_in: boolean
          seated_at: string | null
          completed_at: string | null
          cancelled_at: string | null
          cancellation_reason: string | null
          no_show_at: string | null
          deposit_amount: number | null
          deposit_paid: boolean
          total_amount: number | null
          payment_status: 'PENDING' | 'COMPLETED' | 'REFUNDED' | 'FAILED'
          pre_order_items: Json | null
          calendar_event_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          restaurant_id: string
          user_id?: string | null
          table_id?: string | null
          status?: 'PENDING' | 'CONFIRMED' | 'SEATED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW'
          channel?: 'WEBSITE' | 'MOBILE_APP' | 'GOOGLE_RESERVE' | 'INSTAGRAM' | 'FACEBOOK' | 'PHONE' | 'WALK_IN'
          party_size: number
          date: string
          time: string
          duration?: number
          special_requests?: string | null
          guest_name: string
          guest_email: string
          guest_phone: string
          notes?: string | null
          tags?: string[]
          is_walk_in?: boolean
          seated_at?: string | null
          completed_at?: string | null
          cancelled_at?: string | null
          cancellation_reason?: string | null
          no_show_at?: string | null
          deposit_amount?: number | null
          deposit_paid?: boolean
          total_amount?: number | null
          payment_status?: 'PENDING' | 'COMPLETED' | 'REFUNDED' | 'FAILED'
          pre_order_items?: Json | null
          calendar_event_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          restaurant_id?: string
          user_id?: string | null
          table_id?: string | null
          status?: 'PENDING' | 'CONFIRMED' | 'SEATED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW'
          channel?: 'WEBSITE' | 'MOBILE_APP' | 'GOOGLE_RESERVE' | 'INSTAGRAM' | 'FACEBOOK' | 'PHONE' | 'WALK_IN'
          party_size?: number
          date?: string
          time?: string
          duration?: number
          special_requests?: string | null
          guest_name?: string
          guest_email?: string
          guest_phone?: string
          notes?: string | null
          tags?: string[]
          is_walk_in?: boolean
          seated_at?: string | null
          completed_at?: string | null
          cancelled_at?: string | null
          cancellation_reason?: string | null
          no_show_at?: string | null
          deposit_amount?: number | null
          deposit_paid?: boolean
          total_amount?: number | null
          payment_status?: 'PENDING' | 'COMPLETED' | 'REFUNDED' | 'FAILED'
          pre_order_items?: Json | null
          calendar_event_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tables: {
        Row: {
          id: string
          restaurant_id: string
          floor_id: string | null
          name: string
          number: number
          capacity: number
          min_party_size: number | null
          x: number | null
          y: number | null
          shape: string | null
          status: 'AVAILABLE' | 'BOOKED' | 'SEATED' | 'DIRTY' | 'RESERVED' | 'OUT_OF_SERVICE'
          section: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          restaurant_id: string
          floor_id?: string | null
          name: string
          number: number
          capacity: number
          min_party_size?: number | null
          x?: number | null
          y?: number | null
          shape?: string | null
          status?: 'AVAILABLE' | 'BOOKED' | 'SEATED' | 'DIRTY' | 'RESERVED' | 'OUT_OF_SERVICE'
          section?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          restaurant_id?: string
          floor_id?: string | null
          name?: string
          number?: number
          capacity?: number
          min_party_size?: number | null
          x?: number | null
          y?: number | null
          shape?: string | null
          status?: 'AVAILABLE' | 'BOOKED' | 'SEATED' | 'DIRTY' | 'RESERVED' | 'OUT_OF_SERVICE'
          section?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}

