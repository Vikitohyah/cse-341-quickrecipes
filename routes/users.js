const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const { userRules, validate } = require('../middleware/validator'); // Keep existing validation
const { isAuthenticated } = require('../middleware/authenticate'); // Import authentication middleware

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);

// Apply authentication to POST, PUT, and DELETE routes for users
router.post('/', isAuthenticated, userRules, validate, usersController.createUsers);
router.put('/:id', isAuthenticated, userRules, validate, usersController.updateUser);
router.delete('/:id', isAuthenticated, usersController.deleteUser);

module.exports = router;