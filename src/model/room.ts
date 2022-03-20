export class Amenity {
  label: string;
  identifier: string;

  constructor(label: string, identifier: string) {
    this.label = label;
    this.identifier = identifier;
  }
}

export class Room {
  id!: string;
  number_of_beds: number;
  identification: string;
  size_meters: number;
  number_of_bathrooms: number;
  amenities: Array<Amenity>;
  smoking: boolean;

  constructor(
    number_of_beds: number,
    identification: string,
    size_meters: number,
    number_of_bathrooms?: number,
    amenities?: Array<Amenity>,
    smoking?: boolean
  ) {
    this.number_of_beds = number_of_beds;
    this.identification = identification;
    this.size_meters = size_meters;
    this.number_of_bathrooms = number_of_bathrooms || 0;
    this.amenities = amenities || [];
    this.smoking = smoking || false;
  }
}