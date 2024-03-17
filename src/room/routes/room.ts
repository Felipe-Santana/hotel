import { Router } from "express";
import { RoomController } from "../controllers/roomController";
import { FileRepository } from "../repository/file";
import { uploadImagesMiddleware } from "../../util/uploadImagesMiddleware.js";

export class RoomRouter {
  private roomController: RoomController;
  private _: Router;
  private fileRepository: FileRepository;

  constructor(roomController: RoomController, fileRepository: FileRepository) {
    this.roomController = roomController;
    this._ = Router();
    this.fileRepository = fileRepository;
  }

  load(router: Router) {
    this._.post('/', this.roomController.create());
    this._.get('/', this.roomController.list());
    this._.delete('/:id', this.roomController.delete());
    this._.get('/:id', this.roomController.get());
    this._.post('/images', uploadImagesMiddleware(this.fileRepository, 'rooms'));
    router.use('/rooms', this._);
  }
}