import { PaginationFilter } from "./PaginationFilter";
import { PaginationModel } from "./PaginationModel";

export abstract class Pagination {
  public static pagination<T>(
    items: T[],
    filter: PaginationFilter
  ): PaginationModel<T> {
    const total = items.length;

    const page = +filter.page;
    const limit = +filter.limit;

    let startIndex = (page - 1) * limit;
    let end = Math.ceil(total / limit);
    let lastIndex = startIndex + limit;
    let itemsInPage = items.slice(startIndex, lastIndex);

    const x = new PaginationModel<T>(
      itemsInPage,
      total,
      filter.page,
      filter.limit,
      startIndex,
      end
    );

    return x;
  }
}
