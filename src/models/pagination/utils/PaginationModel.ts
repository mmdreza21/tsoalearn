export class PaginationModel<TSchema> {
  //   data!: TSchema[];
  //   page!: Number;
  //   pageSize!: Number;
  //   totalItems!: Number;
  constructor(
    public data: TSchema[],
    public totalItems: number,
    public page: Number,
    public pageSize: Number,
    public startIndex: number,
    public end: number
  ) {}
}
