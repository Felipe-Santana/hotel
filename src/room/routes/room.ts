import { Router } from "express";
import { RoomController } from "../controllers/roomController";
import { FileRepository } from "../repository/file";
import { uploadImagesMiddleware } from "../../util/uploadImagesMiddleware.js";

export class RoomRouter {
  private roomController: RoomController;
  private _: Router;

  constructor(roomController: RoomController) {
    this.roomController = roomController;
    this._ = Router();
  }

  load(router: Router, fileRepository: FileRepository) {
    this._.post('/', this.roomController.create.bind(this.roomController));
    this._.get('/', this.roomController.list.bind(this.roomController));
    this._.delete('/:id', this.roomController.delete.bind(this.roomController));
    this._.get('/:id', this.roomController.get.bind(this.roomController));
    this._.post('/:id/images', uploadImagesMiddleware(fileRepository, 'rooms'));
    router.use('/rooms', this._);
  }
}