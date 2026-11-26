export interface SGSError<TError> {
  message: string;
  code: number;
  data: TError;
}
