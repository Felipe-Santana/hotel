import { Room } from "../room";

describe("Room model", () => {
  it("should initialize a room with the required fiedls", () => {
    const numberOfBeds = 0;
    const identification = "room-a545";
    const sizeInMeters = 30;

    const room = new Room(numberOfBeds, identification, sizeInMeters);

    expect(room).toBeDefined();
    expect(room.number_of_beds).toBe(numberOfBeds);
    expect(room.identification).toBe(identification);
    expect(room.size_meters).toBe(sizeInMeters);
    expect(room.smoking).toBe(false);
    expect(room.number_of_bathrooms).toBe(0);
    expect(room.facilities).toBeInstanceOf(Array);
    expect(room.facilities.length).toBe(0);
    expect(room.id).toBe(undefined);
  });
});
