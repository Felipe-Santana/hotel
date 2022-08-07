import mongoose from "mongoose";

export class Database {
  private static instance: Database;
  connection!: mongoose.Connection;
  private dbPass!: string;
  private dbUser!: string;
  private dbName!: string;
  private dbHost!: string;
  private dbPort!: number;

  private constructor() { }

  static async getInstance(dbUser?: string, dbPass?: string, dbName?: string, dbHost?: string, dbPort?: number) {
    if (Database.instance) return Database.instance;
    if (!dbUser || !dbPass || !dbName || !dbHost || !dbPort)
      throw new Error("Missing parameters to create database connection");
    Database.instance = new Database();
    Database.instance.dbHost = dbHost;
    Database.instance.dbName = dbName;
    Database.instance.dbPass = dbPass;
    Database.instance.dbPort = dbPort;
    Database.instance.dbUser = dbUser;
    const url =
      `mongodb://${Database.instance.dbUser}:${Database.instance.dbPass}@${Database.instance.dbHost}:${Database.instance.dbPort}/${Database.instance.dbName}`;
    await mongoose.connect(url);
    Database.instance.connection = mongoose.connection;
    return Database.instance;
  }
}