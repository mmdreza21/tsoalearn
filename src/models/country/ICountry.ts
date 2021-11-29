import { Document } from "mongoose";
export interface ICountry extends Document {
    id: string
    title: string;
}

export class Country {
    id!: string;
    title!: string
}