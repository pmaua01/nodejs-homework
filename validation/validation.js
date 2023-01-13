const Joi = require("joi");
const { httpError } = require("../helpers/httpError");

const addContactSchema = Joi.object({
  name: Joi.string().min(3).required(),

  phone: Joi.number().min(4).required(),
  email: Joi.string().min(3).required(),
});

const updateFavorite = Joi.object({
  favorite: Joi.string().min(4).required(),
});

function validateBody(schema) {
  return (req, res, next) => {
    console.log(req.body);
    const { error } = schema.validate(req.body);
    if (error) {
      return next(httpError(400, error.message));
    }
    return next();
  };
}

module.exports = { addContactSchema, updateFavorite, validateBody };
