import { existsSync, mkdirSync } from 'fs';

const validTypes: { [mimetype: string]: string } = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png'
};

const verifyFolder = (folder: string) => !existsSync(folder) && mkdirSync(folder);

export { validTypes, verifyFolder };