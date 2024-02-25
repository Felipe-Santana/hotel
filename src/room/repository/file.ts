import mongoose from "mongoose";
import { Database } from "./mongodb";
import { File } from "../model/file";
import { logger } from "../../util/logger.js";

export class FileRepository {
  private database: Database;
  private collectionName: string;
  private collection!: mongoose.Collection;

  constructor(database: Database, collectionName?: string) {
    this.database = database;
    this.collectionName = process.env.FILE_COLLECTION_NAME ?? collectionName ?? 'files';
    this.setCollection();
  }

  async setCollection() {
    this.collection = this.database.connection.collection(this.collectionName);
    try {
      await this.collection.createIndex({ id: 1 }, { unique: true });
      logger.info('File id index created');
    } catch (err) {
      logger.error(err.message);
    }
  }

  async saveFile(file: File) {
    if (this.collection) return await this.collection.insertOne(file);
    throw new Error("Collection not configured");
  }
}