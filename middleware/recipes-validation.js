const { body, validationResult } = require("express-validator")
const validate = {}

/*  **********************************
  *  Create Recipe Validation Rules
  * ********************************* */
validate.createRecipeRules = () => {
  return [
    body("title")
      .isString()
      .withMessage("Recipe title must be a string.")
      .trim()
      .notEmpty()
      .withMessage("Recipe title is required."),

    body("description")
      .isString()
      .withMessage("Recipe description must be a string.")
      .trim()
      .notEmpty()
      .withMessage("Recipe description is required."),

    body("ingredients")
      .isArray({ min: 1 })
      .withMessage("Ingredients must be a non-empty array"),

    body("ingredients.*")
      .isString()
      .withMessage("Each ingredient must be a string"),

    body("steps")
      .isArray({ min: 1 })
      .withMessage("Steps must be a non-empty array"),

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
      .isString()
      .withMessage("Category must be a string.")
      .trim()
      .notEmpty()
      .withMessage("Category is required."),

    body("userId")
      .notEmpty()
      .withMessage("User ID is required.")
  ]
}

/*  **********************************
  *  Update Recipe Validation Rules
  * ********************************* */ 
validate.updateRecipeRules = () => {
  return [
    body("title")
      .optional()
      .isString()
      .withMessage("Recipe title must be a string.")
      .trim(),

    body("description")
      .optional()
      .isString()
      .withMessage("Recipe description must be a string.")
      .trim(),

    body("ingredients")
      .optional()
      .isArray({ min: 1 })
      .withMessage("Ingredients must be a non-empty array"),

    body("ingredients.*")
      .optional()
      .isString()
      .withMessage("Each ingredient must be a string"),

    body("steps")
      .optional()
      .isArray({ min: 1 })
      .withMessage("Steps must be a non-empty array"),

    body("steps.*")
      .optional()
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
      .optional()
      .isString()
      .withMessage("Category must be a string.")
      .trim()
      .notEmpty()
      .withMessage("Category cannot be empty."),

    body("userId")
      .optional()
      .notEmpty()
      .withMessage("User ID cannot be empty.")
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