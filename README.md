## Запуск

### Требования

- Docker и Docker Compose
- Node.js 22+ — только для режима разработки

### Быстрый старт

```bash
git clone https://github.com/garik-sukhanov/graphql-resume.git
cd graphql-resume
cp example.env .env
docker compose up --build
```

## Тесты

```bash
npm test          # юнит-тесты, база не нужна
npm run test:e2e  # требует поднятых контейнеров и заполненной базы
```
