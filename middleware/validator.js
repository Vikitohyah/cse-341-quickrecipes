const { body, validationResult } = require('express-validator');

const recipeRules = [
    // Updated recipe rules to match the schema expected by controllers/recipes.js
    body('name').notEmpty().withMessage('Name is required'),
    body('ingredients').notEmpty().withMessage('Ingredients are required and should be a string'),
    body('instructions').notEmpty().withMessage('Instructions are required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('prepTime').notEmpty().withMessage('Preparation time is required'),
    body('cookTime').notEmpty().withMessage('Cook time is required'),
    body('servings').isInt({ min: 1 }).withMessage('Servings must be a positive integer'),
];

const userRules = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('oauthId').notEmpty().withMessage('OauthId is required'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors,
    });
};

module.exports = {
    recipeRules, // Export the updated recipeRules
    userRules,
    validate
};
