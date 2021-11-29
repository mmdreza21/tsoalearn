import { CountryModel } from "../models/country/CountryModel";
import { ICountry } from "../models/country/ICountry";
import { Singleton } from "typescript-ioc";
import { countryCreationRequest } from "../models/country/countryCreationRequest";

@Singleton
export class countryService {
  async findAll(): Promise<(ICountry & { _id: any })[]> {
    return await CountryModel.find();
  }

  async create(request: countryCreationRequest): Promise<ICountry> {
    const country = await new CountryModel({
      ...request,
    });
    await country.save();
    return country;
  }

  async findOne(id: string): Promise<(ICountry & { _id: any }) | null> {
    return await CountryModel.findById(id);
  }
}
