const validator = require('../helpers/validate');

const saveRecipe = (req, res, next) => {
    const validationRule = {
        name: 'required|string',
        ingredients: 'required|string',
        instructions: 'required|string',
        category: 'required|string',
        prepTime: 'required|string',
        cookTime: 'required|string',
        servings: 'required|integer'
    };

    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveRecipe
};