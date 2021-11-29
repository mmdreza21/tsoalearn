import { Document } from "mongoose";
export interface ICountry extends Document {
  _id: any;
  title: string;
}

export class Country {
  _id!: any;
  title!: string;
}
