const express = require('express');
const router = express.Router();
const validate = require('../middleware/recipes-validation'); 
const recipesController = require('../controllers/recipes');
const aunthenticate = require('../middleware/authenticate');

router.get('/', recipesController.getAll);
router.get('/:id', recipesController.getSingle);

router.post('/',
   // aunthenticate.isAuthenticated,
    validate.createRecipeRules(),
    validate.checkErrors,
    recipesController.createRecipes)
    
    
router.put('/:id',
   // aunthenticate.isAuthenticated,
    validate.updateRecipeRules(),
    validate.checkErrors,
    recipesController.updateRecipe);
    
router.delete('/:id',
   // aunthenticate.isAuthenticated,
    recipesController.deleteRecipe);

module.exports = router;