import express, { json } from 'express';
import { createServer } from 'http';
import { logger } from '../util/logger';

export function startHttpServer() {
  const app = express();
  app.use(json());

  const httpServer = createServer(app);
  const port = process.env.SERVER_PORT || 3000;

  httpServer.listen(port, () => {
    logger.info(`Server started listening at http://localhost:${port}`);
  });
}
