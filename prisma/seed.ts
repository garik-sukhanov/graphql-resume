import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaClient } from '../src/generated/prisma/client';
import { profileSeed } from './seed-data';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const { skills, experiences, projects, links, ...profile } = profileSeed;

  // Один upsert = одна транзакция. Связи полностью пересоздаются,
  // поэтому повторный запуск не плодит дубли и подхватывает правки в seed-data.
  const result = await prisma.profile.upsert({
    where: { email: profile.email },
    update: {
      ...profile,
      skills: { deleteMany: {}, create: skills },
      experiences: { deleteMany: {}, create: experiences },
      projects: { deleteMany: {}, create: projects },
      links: { deleteMany: {}, create: links },
    },
    create: {
      ...profile,
      skills: { create: skills },
      experiences: { create: experiences },
      projects: { create: projects },
      links: { create: links },
    },
  });

  console.log(
    `Сид применён: ${result.email} — ` +
      `навыков ${skills.length}, опыта ${experiences.length}, ` +
      `проектов ${projects.length}, ссылок ${links.length}`,
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
