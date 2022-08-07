import busboy from "busboy";
import { Request, Response, NextFunction } from "express";
import { nanoid } from "nanoid";
import { existsSync, mkdirSync, createWriteStream } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { FileRepository } from "../repository/file";
import { File } from '../model/file.js';

enum ErrorCode {
  OWNER_ID_ERROR = 'owner_id_error',
  UPLOAD_ERROR = 'upload_error',
  INVALID_FILE_TYPE = 'invalid_file_type_error'
}

const validTypes: { [mimetype: string]: string } = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png'
};

const verifyFolder = (folder: string) => !existsSync(folder) && mkdirSync(folder);

export function uploadImagesMiddleware(repository: string = 'default', fileRepository: FileRepository) {
  return (req: Request, res: Response, next: NextFunction) => {
    const ownerId = req.params.id;

    if (!ownerId) {
      return res.status(400).json({
        code_err: ErrorCode.OWNER_ID_ERROR,
        message: 'Missing required parameter owner id'
      });
    }

    let ids: string[] = [];

    try {
      const bb = busboy({ headers: req.headers });

      bb.on('file', async (_name, file, info) => {
        const { mimeType, filename } = info;

        if (!validTypes[mimeType]) {
          return res.status(400).json({
            code_err: ErrorCode.INVALID_FILE_TYPE,
            message: `File ${filename} contains invalid type ${mimeType}`
          });
        }

        const filesDir = process.env.FILES_DIR || tmpdir();

        verifyFolder(filesDir);

        const repositoryDir = join(filesDir, repository);

        verifyFolder(repositoryDir);

        const ownerDir = join(repositoryDir, ownerId);

        verifyFolder(ownerDir);

        const fileId = nanoid();
        const fileName = `${fileId}.${validTypes[mimeType]}`;
        const filePath = join(ownerDir, fileName);

        const newFile = new File(fileId, ownerId, fileName, repository);
        await fileRepository.saveFile(newFile);

        ids.push(fileId);

        file.pipe(createWriteStream(filePath));
      });

      bb.on('close', () => {
        res.status(201).json({ files: ids });
      });

      req.pipe(bb);
    } catch (error) {
      return res.status(500).json({
        code_err: ErrorCode.UPLOAD_ERROR,
        message: error.message
      });
    }
  }
}
