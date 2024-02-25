import { SessionData } from "express-session";

declare module 'express-session' {
  export interface SessionData {
    owner_id?: string;
  }
}