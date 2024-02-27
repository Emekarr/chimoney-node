import Joi, { ObjectSchema } from "joi";

const createUserSchema = Joi.object({
  firstName: Joi.string().max(20).required(),
  lastName: Joi.string().max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  deviceID: Joi.string().required(),
  userAgent: Joi.string(),
  transactionPin: Joi.string()
    .regex(/^\d{4}$/)
    .error(Error("transaction pin must be a 4 digit number"))
    .required(),
  appVersion: Joi.string().required(),
});

const sendValueViaEmailSchema = Joi.object({
  email: Joi.string().email().required(),
  amount: Joi.number().positive().required(),
  transactionPin: Joi.string().required(),
});

const schemaMap: Record<string, ObjectSchema> = {
  create_user: createUserSchema,
  send_value_email: sendValueViaEmailSchema,
};

export default schemaMap;
