const express = require('express');
const router = express.Router();
const validate = require('../middleware/recipes-validation'); 

const recipesController = require('../controllers/recipes');
const { route } = require('./swagger');

router.get('/', recipesController.getAll);
router.get('/:id', recipesController.getSingle);

router.post('/',
    validate.createRecipeRules(),
    validate.checkErrors,
    recipesController.createRecipes)

module.exports = router;