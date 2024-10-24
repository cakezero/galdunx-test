import Joi from "joi";

const userValidation = Joi.object({
  password: Joi.string()
    .pattern(
      new RegExp("^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:'\",.<>/?]{3,30}$")
    )
    .trim()
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .trim()
    .required(),
});

const loginValidation = Joi.object({
  password: Joi.string()
    .pattern(
      new RegExp("^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:'\",.<>/?]{3,30}$")
    )
    .trim()
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .trim()
    .optional(),
});


export {
  userValidation,
  loginValidation
};
