# TODO PROJECT

## Setup SSL proxy

To run the app locally on `https://dev.realdevsquad.com/` add `127.0.0.1 dev.realdevsquad.com` in your `/etc/hosts`.
This step is required if you want to call the staging API.

## Local Development Setup

This project uses [PNPM](https://pnpm.io/motivation) for package management.
So, make sure to install PNPM to use the project.

From your terminal:

```sh
pnpm dev
```

This starts your app in development mode, rebuilding assets on file changes.

To build your app for production:

```sh
pnpm build
```

Then preview the production build:

```sh
pnpm preview
```

## Project Structure

We are using **Vite + React + TanStack Router** for this project. The project follows a modular structure with clear separation of concerns.

### Routes

This project uses **TanStack Router** for routing. Routes are defined in the `/src/routes` directory and follow a file-based routing system. Read more about TanStack Router [here](https://tanstack.com/router/latest)

#### Directory Structure

```
src/routes
||__ __root.tsx
||__ _internal.tsx
||__ _internal.admin.tsx
||__ _internal.dashboard.tsx
||__ _internal.teams.tsx
||__ _internal.teams.$teamId.tsx
||__ _internal.teams.$teamId.activities.tsx
||__ _internal.teams.$teamId.members.tsx
||__ _internal.teams.$teamId.todos.tsx
||__ _internal.teams.create.tsx
||__ _internal.teams.index.tsx
||__ _internal.teams.join.tsx
||__ index.tsx
```

#### Routes Created by TanStack Router

```
/
/internal/admin
/internal/dashboard
/internal/teams
/internal/teams/create
/internal/teams/join
/internal/teams/[teamId]
/internal/teams/[teamId]/activities
/internal/teams/[teamId]/members
/internal/teams/[teamId]/todos
```

> Note: In `/internal/teams/[teamId]` the `[teamId]` part is dynamic and can be any team ID.

### Components

All the reusable components are created inside `/src/components` directory.

### Public

All the public assets like `icons`, `images` are stored inside the `/public` directory.
