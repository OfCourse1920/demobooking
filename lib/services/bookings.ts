import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'

type Booking = Database['public']['Tables']['bookings']['Insert']
type BookingRow = Database['public']['Tables']['bookings']['Row']

export async function createBooking(bookingData: {
  restaurantId: string
  date: string
  time: string
  partySize: number
  tableId?: string
  guestName: string
  guestEmail: string
  guestPhone: string
  specialRequests?: string
}) {
  const supabase = createClient()

  // Check if table is available
  if (bookingData.tableId) {
    const { data: existingBookings } = await supabase
      .from('bookings')
      .select('id')
      .eq('table_id', bookingData.tableId)
      .eq('date', bookingData.date)
      .eq('time', bookingData.time)
      .in('status', ['CONFIRMED', 'SEATED'])

    if (existingBookings && existingBookings.length > 0) {
      throw new Error('Table is not available at this time')
    }
  }

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()

  // Create booking
  const { data: booking, error } = await supabase
    .from('bookings')
    .insert({
      restaurant_id: bookingData.restaurantId,
      user_id: user?.id || null,
      table_id: bookingData.tableId || null,
      status: 'CONFIRMED',
      channel: 'WEBSITE',
      party_size: bookingData.partySize,
      date: bookingData.date,
      time: bookingData.time,
      guest_name: bookingData.guestName,
      guest_email: bookingData.guestEmail,
      guest_phone: bookingData.guestPhone,
      special_requests: bookingData.specialRequests || null,
      deposit_paid: false,
      payment_status: 'PENDING',
      tags: [],
      is_walk_in: false,
    })
    .select()
    .single()

  if (error) throw error

  // Create reminders
  if (booking) {
    await supabase.from('reminders').insert([
      { booking_id: booking.id, type: '24h' },
      { booking_id: booking.id, type: '2h' },
    ])
  }

  return booking
}

export async function getBookings(filters?: {
  restaurantId?: string
  userId?: string
  date?: string
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let query = supabase
    .from('bookings')
    .select(`
      *,
      tables (*),
      restaurants (
        name,
        address
      )
    `)
    .order('date', { ascending: false })

  if (filters?.restaurantId) {
    query = query.eq('restaurant_id', filters.restaurantId)
  }

  if (filters?.userId) {
    query = query.eq('user_id', filters.userId)
  } else if (user && user.id) {
    // If user is not admin/manager, only show their bookings
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (userData?.role !== 'ADMIN' && userData?.role !== 'MANAGER') {
      query = query.eq('user_id', user.id)
    }
  }

  if (filters?.date) {
    query = query.eq('date', filters.date)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}

