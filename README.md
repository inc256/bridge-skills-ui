# Bridge Skills UI Monorepo

Detailed workspace documentation: [MONOREPO.md](./MONOREPO.md)

This repository is now organized as a frontend monorepo with three separate TanStack Start apps:

- `apps/student` for the learner experience
- `apps/tutor` for the instructor experience
- `apps/admin` for the operations and governance experience

Each app is independently runnable and buildable, while the root workspace manages shared dependencies.

## Development

Install dependencies once at the repository root:

```sh
npm install
```

Start one app at a time:

```sh
npm run dev:student
npm run dev:tutor
npm run dev:admin
```

Build all apps:

```sh
npm run build
```

Build a single app:

```sh
npm run build:student
npm run build:tutor
npm run build:admin
```

## Structure

- `apps/student` keeps only student-facing routes and auth
- `apps/tutor` keeps only tutor-facing routes and auth
- `apps/admin` keeps only admin-facing routes and auth

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
