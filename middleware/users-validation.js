const { body, validationResult } = require("express-validator")
const validate = {}

/*  **********************************
  *  Create User Validation Rules
  * ********************************* */
validate.createUsersRules = () => {
  return [
    
    body("name")
      .trim()
      .notEmpty()
      .withMessage("User name is required."),

    body("email")
      .trim()
      .notEmpty()
      .withMessage("User email is required.")
      .isEmail()
      .withMessage("Invalid email format."),

    body("oauthId")
        .trim()
        .notEmpty()
        .withMessage("OAuth ID is required.")
        .isString()
        .withMessage("OAuth ID must be a string")
    ]
}


/*  **********************************
  *  Update Course Validation Rules
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