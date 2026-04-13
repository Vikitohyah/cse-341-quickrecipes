const express = require('express');
const router = express.Router();
const validate = require('../middleware/recipes-validation'); 
const favoritesController = require('../controllers/favorites');
const aunthenticate = require('../middleware/authenticate');

router.get('/', favoritesController.getAll);
router.get('/:id', favoritesController.getSingle);

router.post('/',
    aunthenticate.isAuthenticated,
    validate.createFavoriteRules(),
    validate.checkErrors,
    favoritesController.createFavorites)
    

module.exports = router;