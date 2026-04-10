const { body, validationResult } = require("express-validator")
const validate = {}

/*  **********************************
  *  Create User Validation Rules
  * ********************************* */
validate.createUsersRules = () => {
  return [
    body("name")
      .isString()
      .withMessage("User name must be a string.")
      .trim()
      .notEmpty()
      .withMessage("User name is required."),

    body("email")
      .isEmail()
      .withMessage("Invalid email format.")
      .normalizeEmail(),

    body("oauthId")
      .isString()
      .withMessage("OAuth ID must be a string.")
      .trim()
      .notEmpty()
      .withMessage("OAuth ID is required.")
  ]
}

/*  **********************************
  *  Update Course Validation Rules
  * ********************************* */
 validate.updateUserRules = () => {
  return [
    body("name")
      .optional()
      .isString()
      .withMessage("User name must be a string.")
      .trim(),

    body("email")
      .optional()
      .isEmail()
      .withMessage("Invalid email format.")
      .normalizeEmail(),

    body("oauthId")
      .optional()
      .isString()
      .withMessage("OAuth ID must be a string.")
      .trim()
  ]
}

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