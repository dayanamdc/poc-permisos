export interface PagedResult<TData> {
  results: TData;
  continuationToken?: string;
  skipToken?: string;
}
