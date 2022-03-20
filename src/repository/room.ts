import { Collection } from "mongoose";
import { Room } from "../model/room";
import { Database } from "./mongodb";

export class RoomRepository {
  database: Database;
  collectionName: string;
  collection!: Collection;

  constructor(database: Database, collectionName?: string) {
    this.database = database;
    this.collectionName = process.env.ROOM_COLLECTION_NAME || collectionName || 'rooms';
    this.setCollection();
  }

  setCollection() {
    this.collection = this.database.connection.collection(this.collectionName);
  }

  async saveRoom(room: Room) {
    try {
      if (this.collection) return await this.collection.insertOne(room);
      throw new Error("Collection not configured");
    } catch (error) {
      throw error;
    }
  }
}