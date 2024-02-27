import { ValidationResult } from "joi";
import schemas from "./schemas";
import {
  DataValidationResult,
  ValidatorType,
} from "../../entities/interfaces/Validator";

export default class JoiValidator implements ValidatorType {
  validate<T>(payload: any, schema: string): DataValidationResult<T> {
    const result = schemas[schema].validate(payload) as ValidationResult<T>;
    return {
      err: result.error,
      value: result.value,
    };
  }
}
