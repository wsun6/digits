import 'dotenv/config';
import { PrismaClient, Role, Condition } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding the database');

  const password = await hash('changeme', 10);

  // Create default users.
  for (const account of config.defaultAccounts) {
    const role = (account.role as Role) || Role.USER;

    console.log(`  Creating user: ${account.email} with role: ${role}`);

    await prisma.user.upsert({
      where: { email: account.email },
      update: {
        password,
      },
      create: {
        email: account.email,
        password,
        role,
      },
    });
  }

  // Create default Stuff records.
  for (const [index, data] of config.defaultData.entries()) {
    const condition = (data.condition as Condition) || Condition.good;

    console.log(`  Adding stuff: ${data.name} (${data.owner})`);

    await prisma.stuff.upsert({
      where: { id: index + 1 },
      update: {},
      create: {
        name: data.name,
        quantity: data.quantity,
        owner: data.owner,
        condition,
      },
    });
  }

  // Create default Contact records.
  for (const [index, contact] of config.defaultContacts.entries()) {
    console.log(
      `  Adding contact: ${contact.firstName} ${contact.lastName}`,
    );

    await prisma.contact.upsert({
      where: { id: index + 1 },
      update: {
        firstName: contact.firstName,
        lastName: contact.lastName,
        address: contact.address,
        image: contact.image,
        description: contact.description,
        owner: contact.owner,
      },
      create: {
        firstName: contact.firstName,
        lastName: contact.lastName,
        address: contact.address,
        image: contact.image,
        description: contact.description,
        owner: contact.owner,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
