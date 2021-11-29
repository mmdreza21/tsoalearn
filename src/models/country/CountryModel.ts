import { model, Schema } from "mongoose";
import { ICountry } from "./ICountry";
import * as Joi from "joi";
import { countryCreationRequest } from "./countryCreationRequest";

const countrySchema = new Schema<ICountry>({
  title: { type: String, required: true },
});

export function Validation(arg: countryCreationRequest): Joi.ValidationResult {
  const schema = Joi.object({
    title: Joi.string().min(2).required(),
  });
  return schema.validate(arg);
}
export const CountryModel = model("country", countrySchema);
