import busboy from "busboy";
import { Request, Response, NextFunction } from "express";
import { createWriteStream } from 'fs';
import { join } from 'path';
import { FileRepository } from "../room/repository/file";
import { File } from '../room/model/file.js';
import * as uuid from 'uuid';
import { logger } from "./logger.js";
import config from 'config';
import { validTypes, verifyFolder } from "./files.js";

enum ErrorCode {
  OWNER_ID_ERROR = 'owner_id_error',
  UPLOAD_ERROR = 'upload_error',
  INVALID_FILE_TYPE = 'invalid_file_type_error'
}

export function uploadImagesMiddleware(fileRepository: FileRepository, repository: string = 'default') {
  const filesDir = config.get<string>('files.base');

  const repositoryDir = join(filesDir, repository);

  verifyFolder(repositoryDir);

  return (req: Request, res: Response, _: NextFunction) => {
    const ownerId = req.session.owner_id;

    if (!ownerId) {
      return res.status(400).json({
        code_err: ErrorCode.OWNER_ID_ERROR,
        message: 'Missing required parameter owner id'
      });
    }

    if (!uuid.validate(ownerId)) {
      return res.status(400).json({
        code_err: ErrorCode.OWNER_ID_ERROR,
        message: 'Invalid owner id format'
      });
    }

    const ownerDir = join(repositoryDir, ownerId);

    verifyFolder(ownerDir);

    let ids: string[] = [];

    try {
      const bb = busboy({ headers: req.headers });

      bb.on('file', (_name, file, info) => {
        const { mimeType, filename } = info;

        if (!validTypes[mimeType]) {
          return res.status(400).json({
            code_err: ErrorCode.INVALID_FILE_TYPE,
            message: `File ${filename} contains invalid type ${mimeType}`
          });
        }

        const newFile = new File(ownerId, validTypes[mimeType], repository);
        const filePath = join(ownerDir, newFile.name);

        fileRepository.saveFile(newFile).then(() => {
          ids.push(newFile.guid);

          file.pipe(createWriteStream(filePath));
        }).catch((err) => {
          logger.error(err.message);
          return res.status(500).json({
            code_err: ErrorCode.UPLOAD_ERROR,
            message: err.message
          });
        });
      });

      bb.on('close', () => {
        res.status(201).json({ files: ids });
      });

      req.pipe(bb);
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({
        code_err: ErrorCode.UPLOAD_ERROR,
        message: error.message
      });
    }
  }
}
