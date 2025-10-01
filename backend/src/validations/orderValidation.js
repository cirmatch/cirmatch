import Joi from 'joi';
import mongoose from 'mongoose';

const objectIdValidator = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message('Invalid ObjectId');
  }
  return value;
};

export const createOrderSchema = Joi.object({
  orderItems: Joi.array().items(
    Joi.object({
      productId: Joi.string().custom(objectIdValidator).required(),
      quantity: Joi.number().integer().min(1).required(),
      unit: Joi.string().valid('Kg', 'Mt').required(),
    })
  ).min(1).required(),

  name: Joi.string().trim().min(1).required(),
  identifier: Joi.string().trim().min(3).required(),
  address: Joi.string().trim().min(3).required(),

  total: Joi.number().min(0).required(),

  paymentMethod: Joi.string().valid('cash_on_delivery').required(),

  note: Joi.string().allow('', null),
});