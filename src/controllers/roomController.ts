import { Request, Response } from "express";
import { RoomActions } from "../actions/room";
import { RoomRepository } from '../repository/room';

enum ErrorCode {
  MISSING_ROOM = 'missing_room',
  CREATE_ERROR = 'create_room_error',
  LIST_ERROR = 'list_rooms_error',
  DELETE_ERROR = 'delete_rooms_error',
  ROOM_NOT_FOUND = 'room_not_found_error',
  GET_ERROR = 'get_room_error'
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

  async list(req: Request, res: Response) {
    try {
      const rooms = await this.roomRepository.list();

      return res.status(200).json({ rooms });
    } catch (error) {
      return res.status(500).json({ code_err: ErrorCode.LIST_ERROR, message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.roomRepository.delete(req.params.id);

      return res.status(200).end();
    } catch (error) {
      return res.status(500).json({ code_err: ErrorCode.DELETE_ERROR, message: error.message });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const room = await this.roomRepository.get(id);

      if (!room) {
        return res.status(404).json({ code_err: ErrorCode.ROOM_NOT_FOUND, message: `Room not found for id ${id}` });
      }

      return res.status(200).json({ room });
    } catch (error) {
      return res.status(500).json({ code_err: ErrorCode.GET_ERROR, message: error.message });
    }
  }
}