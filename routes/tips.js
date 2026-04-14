// c:\Users\LENOVO\quickrecipes\cse-341-quickrecipes\routes\tips.js
const express = require('express');
const router = express.Router();
const tipsController = require('../controllers/tips');
const validates = require('../middleware/tips-validation');
const { isAuthenticated } = require('../middleware/authenticate');

// Route to get all tip entries
router.get('/', tipsController.getAll);

// Route to get a single tip entry by ID
router.get('/:id', tipsController.getSingle);

// Route to create a new tip entry
// Includes authentication, validation rules, and error checking
router.post(
    '/',
    isAuthenticated,
    validates.createTipRules(), // Correctly calls the function to get validation rules
    validates.checkErrors,
    tipsController.createTip
);

// Route to update an existing tip entry by ID
// Includes authentication, validation rules, and error checking
router.put(
    '/:id',
    isAuthenticated,
    validates.updateTipRules(), // Correctly calls the function to get validation rules
    validates.checkErrors,
    tipsController.updateTip
);

// Route to delete a tip entry by ID
// Includes authentication
router.delete('/:id', isAuthenticated, tipsController.deleteTip);

module.exports = router;