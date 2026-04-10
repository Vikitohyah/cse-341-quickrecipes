const express = require('express');
const router = express.Router();
const validate = require('../middleware/recipes-validation'); 

const recipesController = require('../controllers/recipes');

router.get('/', recipesController.getAll);
router.get('/:id', recipesController.getSingle);

router.post('/',
    validate.createRecipeRules(),
    validate.checkErrors,
    recipesController.createRecipes)
    
router.put('/:id',
    validate.updateRecipeRules(),
    validate.checkErrors,
    recipesController.updateRecipe);
    
router.delete('/:id', recipesController.deleteRecipe);

module.exports = router;