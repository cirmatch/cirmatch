export const validateRequest = (schema) => {
  return (req, res, next) => {
    const parsedBody = { ...req.body };
    // Only handle price conversion (quantity stays as string like "5kg")
    if (parsedBody.price === "") {
      parsedBody.price = undefined;
    } else if (parsedBody.price !== undefined) {
      parsedBody.price = Number(parsedBody.price);
    }

    // For all string fields, trim and convert empty strings to undefined
    Object.keys(parsedBody).forEach(key => {
      if (typeof parsedBody[key] === "string") {
        parsedBody[key] = parsedBody[key].trim();
        if (parsedBody[key] === "") {
          parsedBody[key] = undefined;
        }
      }
    });

    const { error } = schema.validate(parsedBody, { abortEarly: false });

    if (error) {
      const errors = error.details.map(detail => detail.message);
      return res.status(400).json({ message: errors, errors });
    }

    req.body = parsedBody;
    next();
  };
};



export const ordervalidate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map(err => err.message);
    return res.status(400).json({ errors: errorMessages });
  }

  next();
};
