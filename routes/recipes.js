const express = require('express');
const router = express.Router();

const recipesController = require('../controllers/recipes');
const { recipeRules, validate } = require('../middleware/validator');

router.get('/', recipesController.getAll);
router.get('/:id', recipesController.getSingle);

router.post('/', recipesController.createRecipes)
router.put('/:id', recipesController.updateRecipe);
router.post('/', recipeRules, validate, recipesController.createRecipes);
router.put('/:id', recipeRules, validate, recipesController.updateRecipe);
router.delete('/:id', recipesController.deleteRecipe);

module.exports = router;