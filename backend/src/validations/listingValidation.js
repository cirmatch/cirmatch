import Joi from "joi";

// Create new listing schema
export const newListingSchema = Joi.object({
  title: Joi.string().required().messages({ "string.empty": "Title is required" }),
  description: Joi.string().required().messages({ "string.empty": "Description is required" }),
  quantity: Joi.string()
    .pattern(/^\d+\s*(Kg|Mt)$/i)
    .required()
    .messages({
      "string.pattern.base": "Quantity must be like '5kg' or '5mt'",
      "any.required": "Quantity is required",
    }),
  price: Joi.number().positive().required().messages({
    "number.base": "Price must be a number",
    "number.positive": "Price must be positive",
    "any.required": "Price is required",
  }),
  location: Joi.string().required().messages({ "string.empty": "Location is required" }),
  plastictype: Joi.string().required().messages({ "string.empty": "Plastic type is required" }),
  metarialtype: Joi.string().required().messages({ "string.empty": "Material type is required" }),
  sourcingCondition: Joi.string()
    .valid("Post Consumer", "Post Industrial", "Mixed")
    .messages({ "any.only": "Invalid sourcing condition" }),
  color: Joi.string().optional(),
  washingProcess: Joi.string()
    .valid("Cold Wash", "Hot Wash", "Unwashed")
    .messages({ "any.only": "Invalid washing process" }),
});

