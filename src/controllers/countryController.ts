import { Country, ICountry } from "../models/country/ICountry";
import { countryService } from "../services/countryService";
import { Inject } from "typescript-ioc";
import { countryCreationRequest } from "../models/country/countryCreationRequest";
import { Pagination } from "../models/pagination/utils/Pagination";
import { PaginationFilter } from "../models/pagination/utils/PaginationFilter";
import { Validation } from "../models/country/CountryModel";

import {
  Route,
  Tags,
  Controller,
  Get,
  Post,
  Body,
  Query,
  Path,
  Res,
  TsoaResponse,
  Delete,
} from "tsoa";

import { objectId } from "../utils/objectId";

@Route("country")
@Tags("country")
export class CountryController extends Controller {
  @Inject
  private countryService!: countryService;

  @Post("/")
  async create(
    @Body() requestBody: countryCreationRequest,
    @Res() badResponse: TsoaResponse<400, { reason: string }>
  ): Promise<ICountry> {
    const { error } = Validation(requestBody);
    if (error) badResponse(400, { reason: error.details[0].message });

    return await this.countryService.create(requestBody);
  }

  @Get()
  async getCountries(
    @Query() page?: number,
    @Query() limit?: number
  ): Promise<any> {
    let pagination = new PaginationFilter(page || 1, limit || 10);
    const countries = await this.countryService.findAll();

    return Pagination.pagination<Country>(countries, pagination);
  }
  @Get("{id}")
  async getOne(
    @Path() id: string,
    @Res() notFound: TsoaResponse<404, { reason: string }>
  ): Promise<(ICountry & { _id: any }) | null> {
    const validOId = objectId(id);
    const country = await this.countryService.findOne(id);
    if (!country || validOId)
      return notFound(404, { reason: "country whit givin ID not found" });
    return country;
  }
  @Delete("/{id}")
  async delete(
    @Path() id: string,
    @Res() notFound: TsoaResponse<404, { reason: string }>
  ): Promise<ICountry> {
    const validOId = objectId(id);
    if (!validOId)
      return notFound(404, { reason: "country whit givin ID not found" });
    const country = await this.countryService.removeOne(id);
    if (!country)
      return notFound(404, { reason: "country whit givin ID not found" });
    return country;
  }
}
