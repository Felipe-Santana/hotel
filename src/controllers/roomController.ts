import { Request, Response } from "express";
import { RoomActions } from "../actions/room";
import { RoomRepository } from '../repository/room';

enum ErrorCode {
  MISSING_ROOM = 'missing_room',
  CREATE_ERROR = 'create_room_error'
}

export class RoomController {
  private roomRepository: RoomRepository;

  constructor(roomRepository: RoomRepository) {
    this.roomRepository = roomRepository;
  }

  async create(req: Request, res: Response) {
    try {
      if (!req.body.room) return res.status(400).json({ code_err: ErrorCode.MISSING_ROOM, message: 'Missing room in body' });

      const room = RoomActions.createRoom(req.body.room);      

      const { insertedId } = await this.roomRepository.saveRoom(room);

      return res.status(201).json({ id: insertedId });
    } catch (error) {
      return res.status(500).json({ code_err: ErrorCode.CREATE_ERROR, message: error.message });
    }
  }
}