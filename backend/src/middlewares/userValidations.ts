import Joi from "joi";

export const validateUser = (name, email, password) =>  {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'yahoo', 'gmail', 'hotmail'] } }).required(),
    password: Joi.string().min(6).required(),
  });

  const validate = schema.validate({ name, email, password });
  return validate;
}