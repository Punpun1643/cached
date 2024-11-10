<div align="center"><strong>Next.js 14 Admin Dashboard Template</strong></div>
<div align="center">Built with the Next.js App Router</div>
<br />
<div align="center">
<a href="https://next-admin-dash.vercel.app/">Demo</a>
<span> · </span>
<a href="https://vercel.com/templates/next.js/admin-dashboard-tailwind-postgres-react-nextjs">Clone & Deploy</a>
<span>
</div>

## Overview
The following are the stack used:

- Framework - [Next.js (App Router)](https://nextjs.org)
- Language - [TypeScript](https://www.typescriptlang.org)
- Auth - [Auth.js](https://authjs.dev)
- State management - [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/quick-start)
- Database - [Postgres](https://vercel.com/postgres)
- Deployment - [Vercel](https://vercel.com/docs/concepts/next.js/overview)
- Styling - [Tailwind CSS](https://tailwindcss.com)
- Components - [Shadcn UI](https://ui.shadcn.com/)
- Analytics - [Vercel Analytics](https://vercel.com/analytics)
- Formatting - [Prettier](https://prettier.io)

## Getting Started

During the deployment, Vercel will prompt you to create a new Postgres database. This will add the necessary environment variables to your project.

### Set up DB

Generate migrations:

```bash
npx drizzle-kit generate
```

Run migrations:

```bash
npx drizzle-kit migrate
```

Update the values in the `.env` file to set up your GitHub OAuth application.

### Start the development server

Finally, run the following commands to start the development server:

```bash
pnpm install
pnpm dev
```

You should now be able to access the application at http://localhost:3000.
