import Joi from "joi";

export const validateTransaction = (description, amount, category, userId) =>  {
  const schema = Joi.object({
    description: Joi.string().required(),
    amount: Joi.number().required(),
    category: Joi.string().required(),
    userId: Joi.string().required(),
  });

  const validate = schema.validate({ description, amount, category, userId });
  return validate;
}
