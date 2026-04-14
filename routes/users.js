const express = require('express');
const router = express.Router();
const validate = require('../middleware/users-validation');
const usersController = require('../controllers/users');
const { isAuthenticated } = require('../middleware/authenticate'); // Import authentication middleware

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);

// Create a new user - requires authentication and validation
router.post('/',
    isAuthenticated,
    validate.createUsersRules(),
    validate.checkErrors,
    usersController.createUsers)

// Update a user - requires authentication and validation
router.put('/:id',
   // aunthenticate.isAuthenticated,
    validate.updateUserRules(),
    validate.checkErrors,
    usersController.updateUser);
    
router.delete('/:id',
   // aunthenticate.isAuthenticated,
    isAuthenticated,
    validate.updateUserRules(),
    validate.checkErrors,
    usersController.updateUser);

// Delete a user - requires authentication
router.delete('/:id', isAuthenticated, usersController.deleteUser);

module.exports = router;