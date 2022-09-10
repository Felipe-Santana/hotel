import { Amenity, Room } from "../model/room.js";

export class RoomActions {
  static createRoom(room: Room) {
    if (!room || Object.keys(room).length === 0) throw new Error('Room cannot be empty, required property "identification" is missing');

    if (typeof room.identification !== "string")
      throw new Error(
        `Invalid type for property "identification".Expected: "string" - Received: ${typeof room.identification}`
      );

    if (room.identification.trim() === '') throw new Error('Room identification cannot be empty');

    if (typeof room.number_of_beds !== "number")
      throw new Error(
        `Invalid type for property "number_of_beds".Expected: "number" - Received: ${typeof room.number_of_beds}`
      );

    if (room.number_of_beds <= 0) throw new Error('Invalid value for property number_of_beds');

    if (typeof room.size_meters !== "number")
      throw new Error(
        `Invalid type for property "size_meters".Expected: "number" - Received: ${typeof room.size_meters}`
      );

    if (room.size_meters <= 0) throw new Error('Invalid value for property size_meters');

    const createdRoom = new Room(
      room.number_of_beds,
      room.identification,
      room.size_meters,
      room.number_of_bathrooms,
      [],
      room.smoking,
      room.description
    );

    if (room.amenities && Array.isArray(room.amenities)) {
      for (const amenity of room.amenities) {
        if (!amenity.label || typeof amenity.label !== 'string' || amenity.label.trim() === '') continue;
        createdRoom.amenities.push(new Amenity(
          amenity.label,
          amenity.label.toLocaleLowerCase().replace(/\s/g, '_')
        ));
      }
    }

    return createdRoom;
  }
}
