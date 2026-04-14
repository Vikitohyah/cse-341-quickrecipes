// c:\Users\LENOVO\quickrecipes\cse-341-quickrecipes\routes\favorites.js
const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favorites');
const favoritesValidation = require('../middleware/favorites-validation');
const { isAuthenticated } = require('../middleware/authenticate');

// Route to get all favorite entries
router.get('/', favoritesController.getAll);

// Route to get a single favorite entry by ID
router.get('/:id', favoritesController.getSingle);

// Route to create a new favorite entry
// Includes authentication, validation rules, and error checking
router.post(
    '/',
    isAuthenticated,
    favoritesValidation.createFavoriteRules(), // Correctly calls the function to get validation rules
    favoritesValidation.checkErrors,
    favoritesController.createFavorites
);

// Route to update an existing favorite entry by ID
// Includes authentication, validation rules, and error checking
router.put(
    '/:id',
    isAuthenticated,
    favoritesValidation.updateFavoriteRules(), // Correctly calls the function to get validation rules
    favoritesValidation.checkErrors,
    favoritesController.updateFavorite
);

// Route to delete a favorite entry by ID
// Includes authentication
router.delete('/:id', isAuthenticated, favoritesController.deleteFavorite);

module.exports = router;