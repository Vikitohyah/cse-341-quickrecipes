const { body, validationResult } = require("express-validator")
const validate = {}

/*  **********************************
  *  Create Favorite Validation Rules
  * ********************************* */

validate.createFavoriteRules = () => {
  return [
    body("userId")
      .notEmpty()
      .withMessage("User ID is required.")
      .isMongoId()
      .withMessage("Invalid User ID format."),

    body("recipeId")
      .notEmpty()
      .withMessage("Recipe ID is required.")
      .isMongoId()
      .withMessage("Invalid Recipe ID format.")
  ]
}

/*  **********************************
  *  Update Favorite Validation Rules
  * ********************************* */
// Rules for validating partial or full updates to a favorite entry
validate.updateFavoriteRules = () => {
  return [
    body("userId")
      .optional()
      .notEmpty()
      .withMessage("User ID cannot be empty.")
      .isMongoId()
      .withMessage("Invalid User ID format."),

    body("recipeId")
      .optional()
      .notEmpty()
      .withMessage("Recipe ID cannot be empty.")
      .isMongoId()
      .withMessage("Invalid Recipe ID format.")
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