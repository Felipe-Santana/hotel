export class Room {
  id!: string;
  number_of_beds: number;
  identification: string;
  size_meters: number;
  number_of_bathrooms: number;
  facilities: Array<string>;
  smoking: boolean;

  constructor(
    number_of_beds: number,
    identification: string,
    size_meters: number,
    number_of_bathrooms?: number,
    facilities?: Array<string>,
    smoking?: boolean
  ) {
    this.number_of_beds = number_of_beds;
    this.identification = identification;
    this.size_meters = size_meters;
    this.number_of_bathrooms = number_of_bathrooms || 0;
    this.facilities = facilities || [];
    this.smoking = smoking || false;
  }
}