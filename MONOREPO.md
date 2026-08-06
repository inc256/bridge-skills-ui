# Monorepo Guide

This document explains how the current Bridge Skills UI monorepo is organized, how the apps are started, and what is shared versus isolated.

## Overview

This repository uses npm workspaces from the root `package.json` to manage three frontend apps in one codebase:

- `apps/student`
- `apps/tutor`
- `apps/admin`

Each app is a separate TanStack Start application with its own routes, auth page, port, and build output. The root of the repository is no longer a runnable app.

## How The Monorepo Works

The root `package.json` declares:

```json
"workspaces": ["apps/*"]
```

That tells npm to treat each folder under `apps/` as a workspace package.

The root also owns the shared dependency installation. That means:

- dependencies are installed once from the repo root with `npm install`
- workspace packages can use those dependencies without maintaining separate `node_modules` folders
- root scripts can call into individual apps with `--workspace`

## App Layout

Each app has its own local config and source tree:

### Student App

- `apps/student/package.json`
- `apps/student/tsconfig.json`
- `apps/student/components.json`
- `apps/student/vite.config.ts`
- `apps/student/src/**`

### Tutor App

- `apps/tutor/package.json`
- `apps/tutor/tsconfig.json`
- `apps/tutor/components.json`
- `apps/tutor/vite.config.ts`
- `apps/tutor/src/**`

### Admin App

- `apps/admin/package.json`
- `apps/admin/tsconfig.json`
- `apps/admin/components.json`
- `apps/admin/vite.config.ts`
- `apps/admin/src/**`

## What Is Separate

These parts are isolated per app:

- route files
- auth pages
- app entry route
- local Vite config
- local TypeScript config
- local port numbers

Current app entry points:

- `apps/student/src/routes/index.tsx`
- `apps/tutor/src/routes/index.tsx`
- `apps/admin/src/routes/index.tsx`

Current dev ports:

- student: `3001`
- tutor: `3002`
- admin: `3003`

Current preview ports:

- student: `4001`
- tutor: `4002`
- admin: `4003`

## What Is Shared

Right now the monorepo shares dependencies through the root workspace installation, but it does **not** yet have a dedicated shared package such as `packages/ui`.

So at the moment:

- packages are shared from the root install
- code is still duplicated between apps where the apps were split from the original single project

That means you can work immediately, but long-term cleanup would usually extract common code into reusable workspace packages.

## Root Scripts

The main scripts live in the root `package.json`:

- `npm run dev:student`
- `npm run dev:tutor`
- `npm run dev:admin`
- `npm run build`
- `npm run build:student`
- `npm run build:tutor`
- `npm run build:admin`

What they do:

- `dev:*` starts one workspace app
- `build` builds all workspace apps
- `build:*` builds a single workspace app

## Typical Workflow

### Install dependencies

Run this once from the repo root:

```sh
npm install
```

### Start one app

Choose the workspace you want:

```sh
npm run dev:student
```

or

```sh
npm run dev:tutor
```

or

```sh
npm run dev:admin
```

### Build one app

```sh
npm run build:admin
```

### Build all apps

```sh
npm run build
```

## Where To Make Changes

If you want to change student behavior, edit files under:

- `apps/student/src/**`

If you want to change tutor behavior, edit files under:

- `apps/tutor/src/**`

If you want to change admin behavior, edit files under:

- `apps/admin/src/**`

If you want to change workspace-level behavior, edit files such as:

- `package.json`
- `README.md`
- `MONOREPO.md`
- `tsconfig.json`
- `eslint.config.js`

## Important Notes

- The old root app was removed. The repo root is no longer where application routes live.
- The open editor may still point at removed root paths if a tab was left open before the migration.
- Use the app folders under `apps/` as the source of truth.
- Each app builds independently even though dependencies are installed from one place.

## Current Tradeoff

This monorepo is already functional, but it is still in an intermediate architecture state:

- good: separate deployable apps
- good: isolated role-specific routes and auth
- good: one install and one workspace root
- not yet ideal: repeated components and utility code across apps

The next architectural improvement would usually be introducing shared workspace packages, for example:

- `packages/ui`
- `packages/lib`
- `packages/config`

That would reduce duplication and make changes easier to apply across all three apps.