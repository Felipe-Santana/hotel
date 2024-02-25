import { v4 } from "uuid";

export class File {
  private id: string;
  owner_id: string;
  name: string;
  repository;

  constructor(owner_id: string, type: string, repository: string) {
    this.id = v4();
    this.owner_id = owner_id;
    this.name = `${this.id}.${type}`;
    this.repository = repository;
  }

  get guid() {
    return this.id;
  }
}
