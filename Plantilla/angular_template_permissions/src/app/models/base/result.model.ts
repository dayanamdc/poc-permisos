import { SGSError } from './sgserror.model';

export interface Result<TData, TError> {
  data: TData;
  error: SGSError<TError>;
}
