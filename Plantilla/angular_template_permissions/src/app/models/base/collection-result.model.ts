export interface CollectionResult<TResults> {
  results: TResults;
  continuationToken: string;
  skipToken: boolean;
}
