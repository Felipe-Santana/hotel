import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import config from 'config';
import { logger } from "../util/logger.js";

function checkAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.replace(/bearer/i, '').trim();

  if (!token) {
    return res.status(400).json({ err: 'Missing authorization header' });
  }

  try {
    const payload = jwt.verify(token, config.get('auth.secret'));

    if (typeof payload !== 'object' || !payload.owner_id) {
      return res.status(401).json({ err: 'Invalid auth token' });
    }

    req.session.owner_id = payload.owner_id;

    next();
  } catch (err) {
    logger.error(err.message);
    return res.status(401).json({ err: 'Invalid auth token' });
  }
}

export { checkAuth };