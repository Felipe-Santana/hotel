import { startHttpServer } from "./server/http";
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

startHttpServer();