const { body, validationResult } = require("express-validator")
const validate = {}

/*  **********************************
  *  Create Tip Validation Rules
  * ********************************* */
validate.createTipRules = () => {
  return [
    body("title")
      .isString()
      .withMessage("Title must be a string.")
      .trim()
      .notEmpty()
      .withMessage("Title is required."),

    body("content")
      .isString()
      .withMessage("Content must be a string.")
      .trim()
      .notEmpty()
      .withMessage("Content is required.")
  ];
};

/*  **********************************
  *  Update Tip Validation Rules
  * ********************************* */
// Rules for validating updates to an existing tip
// Uses .optional() so you only have to send the fields you want to change
validate.updateTipRules = () => {
  return [
    body("title")
      .optional()
      .isString()
      .withMessage("Title must be a string.")
      .trim()
      .notEmpty()
      .withMessage("Title cannot be empty if provided."),

    body("content")
      .optional()
      .isString()
      .withMessage("Content must be a string.")
      .trim()
      .notEmpty()
      .withMessage("Content cannot be empty if provided.")
  ];
};

/*  **********************************
  *  Check Errors from Validation Rules
  * ********************************* */
validate.checkErrors = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  next()
}

module.exports = validate