import { createClient } from '@/lib/supabase/client'

export async function getAvailableTimes(params: {
  date: string
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

  // Get all bookings for this date
  const { data: bookings } = await supabase
    .from('bookings')
    .select('*, tables (*)')
    .eq('restaurant_id', restaurantId)
    .eq('date', params.date)
    .in('status', ['CONFIRMED', 'SEATED'])

  // Generate time slots (11:00 - 22:00)
  const timeSlots: string[] = []
  for (let hour = 11; hour <= 22; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === 22 && minute > 0) break
      timeSlots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`)
    }
  }

  // Get available tables for party size
  const { data: availableTables } = await supabase
    .from('tables')
    .select('id, capacity, min_party_size')
    .eq('restaurant_id', restaurantId)
    .gte('capacity', params.partySize)
    .or(`min_party_size.is.null,min_party_size.lte.${params.partySize}`)
    .neq('status', 'OUT_OF_SERVICE')

  if (!availableTables) return []

  // Filter available times
  const bufferMinutes = restaurant.booking_buffer_minutes || 15
  const availableTimes = timeSlots.filter((time) => {
    const [timeHour, timeMinute] = time.split(':').map(Number)
    const timeMinutes = timeHour * 60 + timeMinute

    // Find conflicting bookings
    const conflictingBookings = (bookings || []).filter((booking: any) => {
      const [bHour, bMinute] = booking.time.split(':').map(Number)
      const bMinutes = bHour * 60 + bMinute
      const bEndMinutes = bMinutes + (booking.duration || 120)

      return (
        (bMinutes <= timeMinutes + bufferMinutes && bEndMinutes > timeMinutes - bufferMinutes) ||
        (timeMinutes <= bEndMinutes + bufferMinutes && timeMinutes + 120 > bMinutes - bufferMinutes)
      )
    })

    const conflictingTableIds = new Set(
      conflictingBookings
        .map((b: any) => b.table_id)
        .filter(Boolean)
    )

    const availableTableCount = availableTables.filter(
      (t) => !conflictingTableIds.has(t.id)
    ).length

    return availableTableCount > 0
  })

  return availableTimes
}

