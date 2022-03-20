import { Application, Router } from "express";
import { RoomController } from "../../controllers/roomController";

export class RoomRouter {
  private roomController: RoomController;
  private _: Router;

  constructor(roomController: RoomController) {
    this.roomController = roomController;
    this._ = Router();
  }

  load(app: Application) {
    this._.post('/', this.roomController.create.bind(this.roomController));
    app.use('/rooms', this._);
  }
}