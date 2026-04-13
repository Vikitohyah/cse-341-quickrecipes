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