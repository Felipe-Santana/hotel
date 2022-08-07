import mongoose from "mongoose";
import { Database } from "./mongodb";
import { File } from "../model/file";
import { logger } from "../util/logger.js";

export class FileRepository {
  private database: Database;
  private collectionName: string;
  private collection!: mongoose.Collection;

  constructor(database: Database, collectionName?: string) {
    this.database = database;
    this.collectionName = process.env.FILE_COLLECTION_NAME || collectionName || 'files';
    this.setCollection();
  }

  setCollection() {
    this.collection = this.database.connection.collection(this.collectionName);
    this.collection.createIndex({ id: 1 }, { unique: true }, (err) => {
      if (err) throw err;
      logger.info('File id index created');
    });
  }

  async saveFile(file: File) {
    try {
      if (this.collection) return await this.collection.insertOne(file);
      throw new Error("Collection not configured");
    } catch (error) {
      throw error;
    }
  }
}