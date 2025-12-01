import { createClient } from '@/lib/supabase/client'

export async function getTables(params?: {
  restaurantId?: string
  date?: string
}) {
  const supabase = createClient()
  const restaurantId = params?.restaurantId || 'demo-restaurant'

  let query = supabase
    .from('tables')
    .select(`
      *,
      floors (*)
    `)
    .eq('restaurant_id', restaurantId)
    .order('number', { ascending: true })

  const { data: tables, error } = await query

  if (error) throw error

  // If date is provided, get current bookings for status
  if (params?.date && tables) {
    const { data: bookings } = await supabase
      .from('bookings')
      .select('id, table_id, status, time, guest_name, party_size')
      .eq('restaurant_id', restaurantId)
      .eq('date', params.date)
      .in('status', ['CONFIRMED', 'SEATED'])

    return tables.map((table) => {
      const currentBooking = bookings?.find((b) => b.table_id === table.id)
      let status = table.status

      if (currentBooking) {
        status = currentBooking.status === 'SEATED' ? 'SEATED' : 'BOOKED'
      }

      return {
        ...table,
        status,
        currentBooking: currentBooking
          ? {
              id: currentBooking.id,
              guestName: currentBooking.guest_name,
              time: currentBooking.time,
              partySize: currentBooking.party_size,
            }
          : null,
      }
    })
  }

  return tables
}

export async function getAvailableTables(params: {
  date: string
  time: string
  partySize: number
  restaurantId?: string
}) {
  const supabase = createClient()
  const restaurantId = params.restaurantId || 'demo-restaurant'

  // Get restaurant settings
  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('booking_buffer_minutes')
    .eq('id', restaurantId)
    .single()

  if (!restaurant) {
    throw new Error('Restaurant not found')
  }

  // Get all tables that can accommodate party size
  const { data: allTables } = await supabase
    .from('tables')
    .select(`
      *,
      floors (*)
    `)
    .eq('restaurant_id', restaurantId)
    .gte('capacity', params.partySize)
    .or(`min_party_size.is.null,min_party_size.lte.${params.partySize}`)
    .neq('status', 'OUT_OF_SERVICE')

  if (!allTables) return []

  // Get conflicting bookings
  const bufferMinutes = restaurant.booking_buffer_minutes || 15
  const [timeHour, timeMinute] = params.time.split(':').map(Number)
  const timeMinutes = timeHour * 60 + timeMinute

  const { data: conflictingBookings } = await supabase
    .from('bookings')
    .select('table_id, time, duration')
    .eq('restaurant_id', restaurantId)
    .eq('date', params.date)
    .in('status', ['CONFIRMED', 'SEATED'])
    .not('table_id', 'is', null)

  // Filter tables by availability
  const availableTables = allTables.map((table) => {
    const hasConflict = (conflictingBookings || []).some((booking) => {
      if (booking.table_id !== table.id) return false

      const [bHour, bMinute] = booking.time.split(':').map(Number)
      const bMinutes = bHour * 60 + bMinute
      const bEndMinutes = bMinutes + (booking.duration || 120)

      return (
        (bMinutes <= timeMinutes + bufferMinutes && bEndMinutes > timeMinutes - bufferMinutes) ||
        (timeMinutes <= bEndMinutes + bufferMinutes && timeMinutes + 120 > bMinutes - bufferMinutes)
      )
    })

    return {
      id: table.id,
      name: table.name,
      capacity: table.capacity,
      floor: (table.floors as any)?.name,
      available: !hasConflict,
    }
  })

  return availableTables
}

