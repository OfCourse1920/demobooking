import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create demo restaurant
  const restaurant = await prisma.restaurant.upsert({
    where: { id: 'demo-restaurant' },
    update: {},
    create: {
      id: 'demo-restaurant',
      name: 'The Fine Dining Restaurant',
      slug: 'fine-dining',
      description: 'An elegant dining experience with world-class cuisine',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      phone: '+1 (555) 123-4567',
      email: 'info@finedining.com',
      website: 'https://finedining.com',
      cuisine: 'French',
      priceRange: 4,
      timeZone: 'America/New_York',
      mondayOpen: '11:00',
      mondayClose: '22:00',
      tuesdayOpen: '11:00',
      tuesdayClose: '22:00',
      wednesdayOpen: '11:00',
      wednesdayClose: '22:00',
      thursdayOpen: '11:00',
      thursdayClose: '22:00',
      fridayOpen: '11:00',
      fridayClose: '23:00',
      saturdayOpen: '10:00',
      saturdayClose: '23:00',
      sundayOpen: '10:00',
      sundayClose: '22:00',
      bookingBufferMinutes: 15,
      minPartySize: 1,
      maxPartySize: 20,
      allowTableSelection: true,
      allowPreOrder: true,
      allowWaitlist: true,
    },
  })

  console.log('Created restaurant:', restaurant.name)

  // Create floor
  const floor = await prisma.floor.create({
    data: {
      restaurantId: restaurant.id,
      name: 'Main Dining Room',
      level: 1,
    },
  })

  // Create tables
  const tables = []
  for (let i = 1; i <= 20; i++) {
    const capacity = i <= 5 ? 2 : i <= 10 ? 4 : i <= 15 ? 6 : 8
    const table = await prisma.table.create({
      data: {
        restaurantId: restaurant.id,
        floorId: floor.id,
        name: `Table ${i}`,
        number: i,
        capacity,
        minPartySize: 1,
        x: (i % 5) * 100,
        y: Math.floor(i / 5) * 100,
        shape: 'rectangle',
        status: 'AVAILABLE',
        section: i <= 5 ? 'A' : i <= 10 ? 'B' : i <= 15 ? 'C' : 'D',
      },
    })
    tables.push(table)
  }

  console.log(`Created ${tables.length} tables`)

  // Create demo user
  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      name: 'Demo User',
      phone: '+1 (555) 987-6543',
      role: 'CUSTOMER',
    },
  })

  console.log('Created user:', user.email)

  // Create staff members
  const staff = await prisma.staff.createMany({
    data: [
      {
        restaurantId: restaurant.id,
        name: 'John Manager',
        email: 'manager@finedining.com',
        role: 'MANAGER',
        active: true,
      },
      {
        restaurantId: restaurant.id,
        name: 'Sarah Host',
        email: 'host@finedining.com',
        role: 'HOST',
        active: true,
      },
      {
        restaurantId: restaurant.id,
        name: 'Mike Server',
        email: 'server@finedining.com',
        role: 'SERVER',
        section: 'A',
        active: true,
      },
    ],
  })

  console.log(`Created ${staff.count} staff members`)

  // Create shifts
  const shifts = await prisma.shift.createMany({
    data: [
      {
        restaurantId: restaurant.id,
        name: 'Lunch',
        startTime: '11:00',
        endTime: '15:00',
        daysOfWeek: [1, 2, 3, 4, 5, 6, 7],
        active: true,
      },
      {
        restaurantId: restaurant.id,
        name: 'Dinner',
        startTime: '17:00',
        endTime: '23:00',
        daysOfWeek: [1, 2, 3, 4, 5, 6, 7],
        active: true,
      },
    ],
  })

  console.log(`Created ${shifts.count} shifts`)

  // Create sample menu items
  const menuItems = await prisma.menuItem.createMany({
    data: [
      {
        restaurantId: restaurant.id,
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce with caesar dressing',
        price: 12.99,
        category: 'Appetizers',
        available: true,
      },
      {
        restaurantId: restaurant.id,
        name: 'Grilled Salmon',
        description: 'Atlantic salmon with seasonal vegetables',
        price: 28.99,
        category: 'Main Course',
        available: true,
      },
      {
        restaurantId: restaurant.id,
        name: 'Chocolate Soufflé',
        description: 'Warm chocolate soufflé with vanilla ice cream',
        price: 14.99,
        category: 'Desserts',
        available: true,
      },
    ],
  })

  console.log(`Created ${menuItems.count} menu items`)

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

