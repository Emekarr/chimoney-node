export interface ValidatorType {
  validate<T>(payload: T, schema: string): DataValidationResult<T>;
}

export interface DataValidationResult<T> {
  err: any;
  value: T;
}
