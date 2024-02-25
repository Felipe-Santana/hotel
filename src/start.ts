import { startHttpServer } from "./server/http.js";
import config from 'config';
import { verifyFolder } from "./util/files.js";

function startApp() {
  const filesDir = config.get<string>('files.base');

  verifyFolder(filesDir);

  startHttpServer();
}

export { startApp };