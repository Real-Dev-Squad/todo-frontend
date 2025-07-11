# TODO PROJECT

## Setup SSL proxy

To run the app locally on `https://staging-todo.realdevsquad.com/` add `127.0.0.1 staging-todo.realdevsquad.com` in your `/etc/hosts`.
This step is required if you want to call the staging API.

## Local Development Setup

This project uses [PNPM](<[https://yarnpkg.com/getting-started](https://pnpm.io/motivation)>) for package management.
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

To build next app along with Storybook in the `out/storybook` directory:

```sh
pnpm build-app-storybook
```

Then run the app in production mode:

```sh
pnpm start
```

## Project Structure

We are using Next.js with App Router for this project. Next.js has a well-defined directory structure that must be used to make sure the app runs properly. Read more about Next.js [here](https://nextjs.org/docs/app/getting-started)

### 'App' directory

In the `Next.js` App Router, a page is a React Component exported from a `page.js`, `page.jsx`, `page.ts`, or `page.tsx` file in the `app` directory. Each page is associated with a route based on its file/directory name. Read more about `App` [here](https://nextjs.org/docs/app). An example is given below -

#### Directory Structure

```
app
|__ members
|   |__ [id]
|   |   |__ page.js
|   |
|   |__ page.js
|
|__ blogs
|   |__ page.js
|
|__ page.js
```

#### Routes Created by Next.js

```
/
/members
/members/[id]
/blogs
```

> Note: In `/members/[id]` the `[id]` part is dynamic it can be `1`, `2`, `a`, etc.

### Components

All the reusable components are created inside `/components` directory.

### Public

All the public assets like `icons`, `images` are stored inside the `public` directory.

## Storybook

To run Storybook in development mode:

```sh
pnpm storybook
```

We can also build storybook in order to deploy it from `storybook-static` folder

```sh
pnpm build:storybook
```
