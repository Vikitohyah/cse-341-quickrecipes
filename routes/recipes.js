const express = require('express');
const router = express.Router();
const validate = require('../middleware/recipes-validation');
const recipesController = require('../controllers/recipes');
const { isAuthenticated } = require('../middleware/authenticate'); // Assuming authentication middleware exists

router.get('/', recipesController.getAll);
router.get('/:id', recipesController.getSingle);

// Create a recipe - requires authentication and validation
router.post('/',
    isAuthenticated,
    validate.createRecipeRules(),
    validate.checkErrors,
    recipesController.createRecipes)

// Update a recipe - requires authentication and validation
router.put('/:id',
    isAuthenticated,
    validate.updateRecipeRules(),
    validate.checkErrors,
    recipesController.updateRecipe);

// Delete a recipe - requires authentication
router.delete('/:id', isAuthenticated, recipesController.deleteRecipe);

module.exports = router;