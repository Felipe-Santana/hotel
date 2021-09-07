import { Room } from "../model/room";

export class RoomActions {
  static createRoom(room: Room) {
    if (!room && Object.keys(room).length === 0) throw new Error('Room cannot be empty');
  
    if (typeof room.identification !== "string")
      throw new Error(
        `Invalid type for property "identification".Expected: "string" - Received: ${typeof room.identification}`
      );
    
    if (room.identification.trim() === '') throw new Error('Room identification cannot be empty');
  
    room.facilities = room.facilities.filter(
      (facility) => typeof facility === "string" && facility.toString().trim() !== ""
    ).map((facility) => facility.toLocaleLowerCase());
  
    return new Room(
      room.number_of_beds,
      room.identification,
      room.size_meters,
      room.number_of_bathrooms,
      room.facilities,
      room.smoking
    );
  }
}
