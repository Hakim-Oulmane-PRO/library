import {Book} from "./Book.model";

export class FamilyBook {
  constructor(
    public id: number,
    public name: string,
    public books?: Book[] | null
  ) {}
}
