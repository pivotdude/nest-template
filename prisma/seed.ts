import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const data = [
    {
      name: 'User',
    },
    {
      name: 'Employee',
    },
    {
      name: 'Admin',
    }

  ]

  await prisma.role.createMany({ data })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
