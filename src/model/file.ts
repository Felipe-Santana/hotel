export class File {
  private id: string;
  owner_id: string;
  name: string;
  repository;

  constructor(id: string, owner_id: string, name: string, repository: string) {
    this.id = id;
    this.owner_id = owner_id;
    this.name = name;
    this.repository = repository;
  }
}
