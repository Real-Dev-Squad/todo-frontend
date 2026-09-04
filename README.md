# TODO PROJECT

Stride — a todo management app for individuals and teams, built with **Vite + React + TanStack Router**.

## Prerequisites

| Tool | Version | Notes                              |
| ---- | ------- | ---------------------------------- |
| Node | 24.20.0 | pinned in `package.json` (`volta`) |
| pnpm | 11.9.0  | pinned in `package.json` (`volta`) |

The easiest way to get both at the right version on macOS, Linux and Windows is
[Volta](https://volta.sh), which reads the pinned versions from `package.json` and
switches automatically when you `cd` into the project:

```sh
# macOS / Linux
curl https://get.volta.sh | bash
```

On Windows, download the installer from [volta.sh](https://volta.sh) (Volta supports
Windows natively). Afterwards run `volta install node pnpm` once, and the pinned
versions are picked up automatically per project.

If you would rather not use Volta, install [Node 24](https://nodejs.org) yourself, then
install pnpm with its own standalone installer rather than `npm install -g` — a global
npm install can clash with other pnpm versions already on your system:

```sh
# macOS / Linux
curl -fsSL https://get.pnpm.io/install.sh | sh -

# Windows (PowerShell)
iwr https://get.pnpm.io/install.ps1 -useb | iex
```

## Getting Started

```sh
git clone https://github.com/RealDevSquad/todo-frontend.git
cd todo-frontend
pnpm install
cp .env.sample .env    # Windows (PowerShell): copy .env.sample .env
pnpm dev:vite
```

The app is now running at **http://localhost:3000**.

> **Do not skip the `.env` step.** The app does not crash without it — it starts and
> renders, but API mocking stays off and every request goes to a relative URL and 404s,
> so the UI silently has no data. Copying `.env.sample` is what makes a fresh clone work.

### Environment variables

`.env` is gitignored. Copy `.env.sample` — it's the source of truth for what's
available, so check it directly rather than relying on this README to stay in sync with
every variable:

```sh
cp .env.sample .env
```

One is worth calling out because its effect isn't obvious from the name:
`VITE_ADMIN_EMAILS` is a comma-separated list of emails that get the admin UI — set it
to your own email if you need to see admin-only pages locally.

The shipped defaults enable API mocking, so **you do not need a running backend** to
work on the frontend. To point at the staging API instead, set:

```sh
VITE_BACKEND_API_URL="https://services.realdevsquad.com/staging-todo"
VITE_API_MOCKING=false
```

## Running the app

There are two dev commands, and most of the time you want the first one:

```sh
pnpm dev:vite   # just the Vite server on http://localhost:3000
pnpm dev        # Vite *and* an HTTPS proxy on https://dev.realdevsquad.com
```

`pnpm dev` runs both tasks in parallel and needs the extra setup in the next section.
Because the two tasks run under `run-p`, **if the proxy fails to start it also kills the
Vite server** — so if `pnpm dev` exits immediately, use `pnpm dev:vite` and come back to
the proxy later.

### Optional: HTTPS proxy for the staging API

Only needed when authenticating against the staging API, which requires the
`realdevsquad.com` domain for its cookies.

1. Point the hostname at your machine by adding this line to your hosts file:

   ```
   127.0.0.1 dev.realdevsquad.com
   ```

   | OS            | Hosts file                              |
   | ------------- | --------------------------------------- |
   | macOS / Linux | `/etc/hosts`                            |
   | Windows       | `C:\Windows\System32\drivers\etc\hosts` |

   You need administrator rights to edit it — `sudo` on macOS/Linux, or open your
   editor as Administrator on Windows.

2. Run `pnpm dev` and visit **https://dev.realdevsquad.com**.

   The proxy listens on port 443. On **Linux** ports below 1024 require elevated
   privileges, so run `sudo -E pnpm dev` or grant the capability once with
   `sudo setcap 'cap_net_bind_service=+ep' $(which node)`. macOS and Windows generally
   allow this without elevation.

   The proxy uses a self-signed certificate, so your browser will warn on first visit.
   Accept the warning to continue.

## Available scripts

| Script                 | What it does                                        |
| ---------------------- | --------------------------------------------------- |
| `pnpm dev:vite`        | Start the dev server on port 3000                   |
| `pnpm dev`             | Dev server + HTTPS proxy (see above)                |
| `pnpm build`           | Type-check with `tsc`, then build to `dist/`        |
| `pnpm preview`         | Serve the production build locally                  |
| `pnpm test`            | Run the test suite once                             |
| `pnpm test:watch`      | Run tests in watch mode                             |
| `pnpm test:coverage`   | Run tests with a coverage report                    |
| `pnpm lint`            | Lint `src` (warnings fail the build)                |
| `pnpm lint:fix`        | Lint and auto-fix                                   |
| `pnpm format`          | Format everything with Prettier                     |
| `pnpm check`           | Check formatting without writing                    |
| `pnpm routes:generate` | Regenerate `src/routeTree.gen.ts` from `src/routes` |

CI runs `lint`, `check`, `test:coverage` and `build`, so running those four locally
before pushing is the quickest way to avoid a red pipeline.

## Project Structure

The project follows a modular structure with clear separation of concerns.

### Routes

This project uses **TanStack Router** with file-based routing. Routes live in
`/src/routes`. Read more about TanStack Router [here](https://tanstack.com/router/latest).

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

`src/routeTree.gen.ts` is generated — do not edit it by hand. Run `pnpm routes:generate`
after adding or renaming a route file.

#### URLs these produce

```
/
/admin
/dashboard
/teams
/teams/create
/teams/join
/teams/[teamId]
/teams/[teamId]/activities
/teams/[teamId]/members
/teams/[teamId]/todos
```

> The `_internal` prefix is a **pathless layout route**: it wraps these pages in shared
> layout without adding a URL segment, which is why the paths are `/admin` and not
> `/internal/admin`. `[teamId]` is dynamic and can be any team ID.

### Components

Reusable components live in `/src/components`. `/src/components/ui` holds the
[shadcn/ui](https://ui.shadcn.com) primitives, built on [Radix UI](https://www.radix-ui.com)
(see the `@radix-ui/*` packages in `package.json`) — these are generated, so prefer
regenerating over hand-editing.

### Mocks

API mocks live in `/src/mocks` and are powered by [MSW](https://mswjs.io). They are
enabled by `VITE_API_MOCKING=true` and only load in development.

`public/mockServiceWorker.js` is generated by MSW's postinstall and must match the
installed `msw` version — do not edit it by hand.

### Public

Static assets like icons and images are stored in `/public`.
