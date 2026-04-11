const { body, validationResult } = require('express-validator');

const recipeRules = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('ingredients').isArray({ min: 1 }).withMessage('Ingredients must be an array with at least one item'),
    body('steps').isArray({ min: 1 }).withMessage('Steps must be an array with at least one item'),
    body('cookingTime').isNumeric().withMessage('Cooking time must be a number'),
    body('difficulty').isIn(['Easy', 'Medium', 'Hard']).withMessage('Difficulty must be Easy, Medium, or Hard'),
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
    recipeRules,
    userRules,
    validate
};
