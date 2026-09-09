import { SkillCategory } from '../src/generated/prisma/enums';

/**
 * Данные для наполнения базы. Хранятся отдельно от логики сида:
 * здесь только резюме, в seed.ts — только работа с БД.
 */
export const profileSeed = {
  email: process.env.OWNER_EMAIL ?? 'igoreksuhanov@gmail.com',
  name: 'Суханов Игорь Геннадьевич',
  phone: null,
  description:
    'Fullstack веб-разработчик, 4+ года коммерческого опыта. Работаю в небольших ' +
    'командах и стартапах, привык закрывать задачи от проектирования до деплоя: ' +
    'React, React Native, Node.js, NestJS, PostgreSQL, Docker. Интересны задачи ' +
    'на стыке frontend-архитектуры и продуктового мышления. Воронеж, удалённый формат.',

  skills: [
    { name: 'TypeScript', category: SkillCategory.LANGUAGE, level: 5 },
    { name: 'JavaScript', category: SkillCategory.LANGUAGE, level: 5 },

    { name: 'React', category: SkillCategory.FRAMEWORK, level: 5 },
    { name: 'React Native', category: SkillCategory.FRAMEWORK, level: 5 },
    { name: 'Expo', category: SkillCategory.FRAMEWORK, level: 4 },
    { name: 'Next.js', category: SkillCategory.FRAMEWORK, level: 4 },
    { name: 'NestJS', category: SkillCategory.FRAMEWORK, level: 4 },
    { name: 'Express.js', category: SkillCategory.FRAMEWORK, level: 4 },
    { name: 'Redux', category: SkillCategory.FRAMEWORK, level: 4 },
    { name: 'MobX', category: SkillCategory.FRAMEWORK, level: 3 },
    { name: 'Tailwind CSS', category: SkillCategory.FRAMEWORK, level: 4 },
    { name: 'Material UI', category: SkillCategory.FRAMEWORK, level: 4 },

    { name: 'PostgreSQL', category: SkillCategory.DATABASE, level: 4 },
    { name: 'MongoDB', category: SkillCategory.DATABASE, level: 4 },
    { name: 'Prisma', category: SkillCategory.DATABASE, level: 4 },
    { name: 'Sequelize', category: SkillCategory.DATABASE, level: 4 },

    { name: 'Node.js', category: SkillCategory.TOOL, level: 5 },
    { name: 'Git', category: SkillCategory.TOOL, level: 5 },
    { name: 'REST API', category: SkillCategory.TOOL, level: 5 },
    { name: 'WebSocket', category: SkillCategory.TOOL, level: 4 },
    { name: 'GraphQL', category: SkillCategory.TOOL, level: 3 },
    { name: 'Docker', category: SkillCategory.TOOL, level: 4 },
    { name: 'CI/CD', category: SkillCategory.TOOL, level: 4 },
    { name: 'Nginx', category: SkillCategory.TOOL, level: 3 },
    { name: 'Jest', category: SkillCategory.TOOL, level: 3 },
  ],

  experiences: [
    {
      company: 'KOBLiK group',
      position: 'Full-stack Web Developer (Frontend)',
      start: new Date('2023-11-01'),
      end: null,
      achievements: [
        'Перевёл мобильное CRM-приложение на React Native на платформу Expo: время сборки сократилось с 30 до 10 минут, появилась поддержка web-версии',
        'Спроектировал структуру модулей клиентского портала для покупателей техники, реализовал интеграцию с REST API и WebSocket',
        'Разработал приложение для весового оборудования: передача более 100 параметров в реальном времени (вес, температура, геолокация), адаптивный интерфейс и интеграция с аппаратными устройствами',
      ],
    },
    {
      company: 'NeuroCity',
      position: 'Full-stack Web Developer',
      start: new Date('2022-07-01'),
      end: new Date('2023-11-01'),
      achievements: [
        'Разработал с нуля модули админ-панели для управления контентом и устройствами — от проектирования архитектуры до backend и frontend',
        'Провёл глубокий рефакторинг SVG-редактора карт: переработал логику рендеринга и расширяемость компонентов, что позволило внедрять 10+ новых инструментов в месяц',
        'Спроектировал и реализовал модуль технической поддержки от схемы БД до интерфейса — время обработки заявки сократилось с двух дней до часа',
        'Расширил раздел сбора и визуализации статистики: 20+ новых метрик, оптимизация фильтрации, перенос тяжёлых вычислений на сервер',
      ],
    },
  ],

  projects: [
    {
      name: 'graphql-resume',
      description:
        'Резюме в виде GraphQL API: NestJS (code-first), Prisma, PostgreSQL, Docker. ' +
        'Вложенные данные через резолверы полей, идемпотентный сид, Apollo Sandbox.',
      // TODO: проверить, что репозиторий опубликован под этим именем
      linkGitHub: 'https://github.com/garik-sukhanov/graphql-resume',
      linkDeploy: null,
      order: 0,
    },
    {
      name: 'Портфолио',
      description:
        'Персональный сайт-резюме на Next.js с локализацией. Развёрнут на Vercel.',
      // TODO: подставить ссылку на репозиторий портфолио
      linkGitHub: 'https://github.com/garik-sukhanov',
      linkDeploy: 'https://garik-sukhanov-resume.vercel.app/ru',
      order: 1,
    },
  ],

  links: [
    { label: 'GitHub', url: 'https://github.com/garik-sukhanov', order: 0 },
    { label: 'Telegram', url: 'https://t.me/garik_sukhanov', order: 1 },
    {
      label: 'Портфолио',
      url: 'https://garik-sukhanov-resume.vercel.app/ru',
      order: 2,
    },
  ],
};
