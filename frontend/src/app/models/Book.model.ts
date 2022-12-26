import {FamilyBook} from "./FamilyBook.model";

export class Book {
  constructor(
    public id: number,
    public name: string,
    public author?: string | null,
    public created?: Date,
    public familyBook?: FamilyBook
  ) {
  }
}
