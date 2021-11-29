import { Country, ICountry } from "../models/country/ICountry";
import { countryService } from "../services/countryService";
import {
  Route,
  Tags,
  Controller,
  Get,
  Post,
  Body,
  Query,
  Res,
  TsoaResponse,
} from "tsoa";
import { Inject } from "typescript-ioc";
import { countryCreationRequest } from "../models/country/countryCreationRequest";
// import { PaginationModel } from "../models/pagination/utils/PaginationModel";
import { Pagination } from "../models/pagination/utils/Pagination";
import { PaginationFilter } from "../models/pagination/utils/PaginationFilter";
import { Validation } from "../models/country/CountryModel";

@Route("country")
@Tags("country")
export class CountryController extends Controller {
  @Inject
  private countryService!: countryService;

  @Post()
  async create(
    @Body() requestBody: countryCreationRequest,
    @Res() badResponse: TsoaResponse<404, { reason: string }>
  ): Promise<ICountry> {
    const { error } = Validation(requestBody);
    if (error) badResponse(404, { reason: error.details[0].message });

    return await this.countryService.create(requestBody);
  }

  @Get()
  async getCountries(
    @Query() page: number,
    @Query() limit: number
  ): Promise<any> {
    let pagination = new PaginationFilter(page, limit);
    const countries = await this.countryService.findAll();

    return Pagination.pagination<Country>(countries, pagination);
  }
}
