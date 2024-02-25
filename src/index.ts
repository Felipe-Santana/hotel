import path from 'path';
import url from 'url';
import dotenv from 'dotenv';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

dotenv.config({ path: path.resolve(__dirname, '.env') });

process.env["NODE_CONFIG_DIR"] = path.resolve(__dirname, 'config');

import { startApp } from './start.js';

startApp();