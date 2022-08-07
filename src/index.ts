import { startHttpServer } from "./server/http.js";
import dotenv from 'dotenv';
import path from 'path';
import url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

dotenv.config({ path: path.resolve(__dirname, '.env') });

startHttpServer();