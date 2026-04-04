const { body, validationResult } = require("express-validator")
const validate = {}

/*  **********************************
  *  Create Recipe Validation Rules
  * ********************************* */
validate.createRecipeRules = () => {
  return [

    body("title")
      .trim()
      .notEmpty()
      .withMessage("Recipe title is required."),

    body("description")
      .trim()
      .notEmpty()
      .withMessage("Recipe description is required."),

    // Ingredients (array of strings)
    body("ingredients")
      .isArray({ min: 1 })
      .withMessage("Ingredients must not be empty"),

    body("ingredients.*")
      .isString()
      .withMessage("Each ingredient must be a string"),

    body("steps")
      .isArray({ min: 1 })
      .withMessage("Steps must not be empty"),

    body("steps.*")
      .isString()
      .withMessage("Each step must be a string"),

    body("cookingTime")
        .optional()
        .isString()
        .withMessage("Cooking time must be a string."),

    body("difficulty")
        .optional()
        .isIn(["easy", "medium", "hard"])
        .withMessage("Invalid difficulty level."),

    body("category")
        .trim()
        .notEmpty()
        .withMessage("Category is required."),

    body("userId")
        .notEmpty()
        .withMessage("User ID is required.")
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