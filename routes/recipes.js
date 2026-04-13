const express = require('express');
const router = express.Router();

const recipesController = require('../controllers/recipes');
const validation = require('../middleware/validate'); // Use the new validation middleware
const { isAuthenticated } = require('../middleware/authenticate'); // Assuming authentication middleware exists

router.get('/', recipesController.getAll);
router.get('/:id', recipesController.getSingle);

// Apply authentication and the new validation to POST and PUT routes
router.post('/', isAuthenticated, validation.saveRecipe, recipesController.createRecipes);
router.put('/:id', isAuthenticated, validation.saveRecipe, recipesController.updateRecipe);
// Apply authentication to DELETE route
router.delete('/:id', isAuthenticated, recipesController.deleteRecipe);

module.exports = router;