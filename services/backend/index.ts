import dotenv from 'dotenv';
import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './server';
import { connectToDB } from './src/config/db';

dotenv.config();

const PORT = process.env.PORT || 4000;
const ENV = process.env.NODE_ENV || 'development';

const app = express();

app.use('/trpc', (req, res, next) => {
  const middleware = trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => ({}),
  });

  return (middleware as unknown as express.RequestHandler)(req, res, next);
});

app.listen(PORT, async () => {
  try {
    connectToDB();

    console.log(
      `Server is running on ${
        ENV === 'development' ? `http://localhost:${PORT}` : `port ${PORT}`
      }`,
    );
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
});

export type { AppRouter } from './server'