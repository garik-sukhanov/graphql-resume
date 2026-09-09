import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { profileSeed } from '../prisma/seed-data';
import { AppModule } from '../src/app.module';

const RESUME_QUERY = /* GraphQL */ `
  {
    profile {
      name
      description
      skills {
        name
        category
      }
      experiences {
        company
        position
        start
        end
        achievements
      }
      projects {
        name
        linkGitHub
      }
      links {
        label
        url
        order
      }
    }
  }
`;

interface ResumeProfile {
  name: string;
  description: string | null;
  skills: { name: string; category: string }[];
  experiences: {
    company: string;
    position: string;
    start: string;
    end: string | null;
    achievements: string[];
  }[];
  projects: { name: string; linkGitHub: string }[];
  links: { label: string; url: string; order: number }[];
}

describe('Профиль агрегат', () => {
  let app: INestApplication;
  let profile: ResumeProfile;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );
    await app.init();

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: RESUME_QUERY })
      .expect(200);

    expect(response.body.errors).toBeUndefined();
    profile = response.body.data.profile;
  });

  afterAll(async () => {
    await app.close();
  });

  it('Имя совпадает с сидом', () => {
    expect(profile.name).toBe(profileSeed.name);
    expect(profile.description).toBe(profileSeed.description);
  });

  it('Отдает связанные коллекции', () => {
    expect(profile.skills.length).toBe(profileSeed.skills.length);
    expect(profile.experiences.length).toBe(profileSeed.experiences.length);
    expect(profile.projects.length).toBe(profileSeed.projects.length);
    expect(profile.links.length).toBe(profileSeed.links.length);
  });

  it('Опыт работы отсортирован от свежего к старому', () => {
    const starts = profile.experiences.map(e => Date.parse(e.start));
    expect(starts).toEqual([...starts].sort((a, b) => b - a));
  });

  it('Место работы без даты окончания', () => {
    // Именно этот случай раньше ронял весь запрос: end был объявлен non-null.
    expect(profile.experiences.some(e => e.end === null)).toBe(true);
  });

  it('Сортировка ссылки по полю order', () => {
    const orders = profile.links.map(l => l.order);
    expect(orders).toEqual([...orders].sort((a, b) => a - b));
  });

  it('Достижения в виде массива строк', () => {
    for (const experience of profile.experiences) {
      expect(experience.achievements.length).toBeGreaterThan(0);
    }
  });
});
