import { inject, injectable } from "tsyringe";
import { ValidatorType } from "../../entities/interfaces/Validator";
import JoiValidator from "../../infrastructure/validator/joi";

@injectable()
export default class Validator {
  constructor(@inject(JoiValidator) public vl: ValidatorType) {}
}
