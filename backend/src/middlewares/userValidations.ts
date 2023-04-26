import Joi from "joi";

export const validateUser = (name, email, password) =>  {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().required(),
  });

  const validate = schema.validate({ name, email, password });
  return validate;
}