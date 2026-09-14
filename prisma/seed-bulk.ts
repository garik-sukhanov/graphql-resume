import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaClient } from '../src/generated/prisma/client';
import { SkillCategory } from '../src/generated/prisma/enums';

/**
 * Нагрузочный сид: PROFILES профилей × SKILLS навыков у каждого.
 * Реальное резюме (prisma/seed.ts) не затрагивает — работает только
 * с профилями на домене DOMAIN.
 */
const PROFILES = Number(process.env.SEED_PROFILES ?? 5000);
const SKILLS = Number(process.env.SEED_SKILLS ?? 100);
const DOMAIN = 'seed.test';
// 50 профилей × 100 навыков = 5000 строк на createMany:
// ~35 000 bind-параметров, с запасом под лимит Postgres в 65 535.
const CHUNK = 50;

const pool = new Pool({ connectionString: `${process.env.DATABASE_URL}` });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

// Детерминированный ГПСЧ (LCG): один и тот же прогон даёт одни и те же
// level/category, поэтому тесты воспроизводимы.
const rand = (() => {
  let s = 20260914;
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
})();

const CATEGORIES = Object.values(SkillCategory);

const BASES = [
  'TypeScript',
  'JavaScript',
  'React',
  'Vue',
  'Angular',
  'Svelte',
  'Node.js',
  'NestJS',
  'Express',
  'Fastify',
  'PostgreSQL',
  'MySQL',
  'MongoDB',
  'Redis',
  'Prisma',
  'TypeORM',
  'Docker',
  'Kubernetes',
  'Git',
  'GraphQL',
];

// 20 баз × 5 «поколений» = 100 уникальных имён в пределах профиля.
const skillName = (i: number) =>
  `${BASES[i % BASES.length]} v${Math.floor(i / BASES.length) + 1}`;

async function main() {
  const started = Date.now();

  const { count: removed } = await prisma.profile.deleteMany({
    where: { email: { endsWith: `@${DOMAIN}` } },
  });
  console.log(`Очищено профилей с прошлого прогона: ${removed}`);

  let createdSkills = 0;

  for (let offset = 0; offset < PROFILES; offset += CHUNK) {
    const size = Math.min(CHUNK, PROFILES - offset);

    const profiles = await prisma.profile.createManyAndReturn({
      select: { id: true },
      data: Array.from({ length: size }, (_, k) => {
        const n = offset + k + 1;
        return {
          email: `user${n}@${DOMAIN}`,
          name: `Тестовый Пользователь ${n}`,
          phone: `+7900${String(n).padStart(7, '0')}`,
          description: `Сгенерированный профиль №${n} для нагрузочных тестов.`,
        };
      }),
    });

    const skills = profiles.flatMap(({ id }) =>
      Array.from({ length: SKILLS }, (_, i) => ({
        profileId: id,
        name: skillName(i),
        category: CATEGORIES[Math.floor(rand() * CATEGORIES.length)],
        level: 1 + Math.floor(rand() * 5),
      })),
    );

    const { count } = await prisma.skill.createMany({ data: skills });
    createdSkills += count;

    console.log(
      `  ${offset + size}/${PROFILES} профилей, навыков ${createdSkills}`,
    );
  }

  console.log(
    `Готово за ${((Date.now() - started) / 1000).toFixed(1)} c: ` +
      `${PROFILES} профилей, ${createdSkills} навыков.`,
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
