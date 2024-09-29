import { db } from '@/lib/db/db'
import { urls } from '@/lib/db/schema';

export const dynamic = 'force-dynamic';

export async function GET() {
  // return Response.json({
  //   message: 'Uncomment to seed data after DB is set up.'
  // });

  await db.insert(urls).values([
    {
      id: 1,
      title: 'Neon Serverless Postgres — Ship faster',
      status: 'pending',
      tag: 'database',
      address: 'https://neon.tech/',
      dateAdded: new Date()
    },
    {
      id: 2,
      title: 'Drizzle with Neon Postgres',
      status: 'read',
      tag: 'database',
      address: 'https://orm.drizzle.team/learn/tutorials/drizzle-with-neon',
      dateAdded: new Date()
    },
    {
      id: 3,
      title: 'URLSearchParams - Web APIs | MDN',
      status: 'pending',
      tag: 'api',
      address: 'https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams',
      dateAdded: new Date()
    },
    {
      id: 4,
      title: 'use-debounce',
      status: 'archived',
      tag: 'tools',
      address: 'https://www.npmjs.com/package/use-debounce',
      dateAdded: new Date()
    },
    {
      id: 5,
      title: 'GitHub - nvm-sh/nvm: Node Version Manager - POSIX-compliant bash script to manage multiple active node.js versions',
      status: 'archived',
      tag: 'tools',
      address: 'https://github.com/nvm-sh/nvm?tab=readme-ov-file#about',
      dateAdded: new Date()
    },
    {
      id: 6,
      title: 'Simplify working and interacting with databases',
      status: 'pending',
      tag: 'package',
      address: 'https://www.prisma.io/',
      dateAdded: new Date()
    },
    {
      id: 7,
      title: 'mockAPI',
      status: 'archived',
      tag: 'package',
      address: 'https://mockapi.io/',
      dateAdded: new Date()
    },
    {
      id: 8,
      title: 'Learn Next.js: Adding Metadata',
      status: 'read',
      tag: 'next.js',
      address: 'https://nextjs.org/learn/dashboard-app/adding-metadata',
      dateAdded: new Date()
    },
    {
      id: 9,
      title: 'JavaScript Developer Roadmap: Step by step guide to learn JavaScript',
      status: 'pending',
      tag: 'javascript',
      address: 'https://roadmap.sh/javascript',
      dateAdded: new Date()
    },
    {
      id: 10,
      title: 'Disjoint Set Union - Algorithms for Competitive Programming',
      status: 'pending',
      tag: 'algorithm',
      address: 'https://cp-algorithms.com/data_structures/disjoint_set_union.html#disjoint-set-union',
      dateAdded: new Date()
    },
  ]);
}
