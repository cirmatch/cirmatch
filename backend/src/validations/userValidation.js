import Joi from "joi";

// Custom validator for identifier: must be a valid email OR a phone number (digits only, 7-15 chars)
const identifierSchema = Joi.string()
  .required()
  .custom((value, helpers) => {
    const isEmailValid = Joi.string().email().validate(value).error === undefined;
    const isPhoneValid = /^[0-9]{7,15}$/.test(value);
    if (!isEmailValid && !isPhoneValid) {
      return helpers.error("any.invalid");
    }
    return value;
  }, "Email or Phone number validation");

// Register validation schema
export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  identifier: identifierSchema,
  password: Joi.string().min(6).max(128).required(),
});

// Login validation schema
export const loginSchema = Joi.object({
  identifier: identifierSchema,
  password: Joi.string().required(),
});

// Verify identifier with code schema
export const verifyIdentifierSchema = Joi.object({
  identifier: identifierSchema,
  code: Joi.string().length(6).pattern(/^\d{6}$/).required(), // exactly 6 digits
});

// Resend verification code schema
export const resendCodeSchema = Joi.object({
  identifier: identifierSchema,
});

// Make user admin schema
export const makeUserAdminSchema = Joi.object({
  identifier: identifierSchema,
});
