import express, { json } from 'express';
import { createServer } from 'https';
import { RoomController } from '../controllers/roomController';
import { Database } from '../repository/mongodb';
import { RoomRepository } from '../repository/room';
import { logger } from '../util/logger';
import { RoomRouter } from './routes/room';
import { readFileSync } from 'fs';
import path from 'path';

export async function startHttpServer() {
  const app = express();
  app.use(json());

  const database = await Database.getInstance(process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_NAME, process.env.DB_HOST, Number(process.env.DB_PORT));
  if (!database) throw new Error("Unable to establish a connection with the database");
  const roomRepository = new RoomRepository(database, 'rooms');
  const roomController = new RoomController(roomRepository);
  const roomRouter = new RoomRouter(roomController);
  roomRouter.load(app);

  const options = {
    key: readFileSync(path.resolve(__dirname, '..', '..', 'certs', 'client-key.pem')),
    cert: readFileSync(path.resolve(__dirname, '..', '..', 'certs', 'client-cert.pem')),
    passphrase: 'e4jphBTqTq!P@d&@'
  };
  const httpsServer = createServer(options, app);
  const port = process.env.SERVER_PORT || 3000;

  httpsServer.listen(port, () => {
    logger.info(`Server started listening at https://localhost:${port}`);
  });
}
