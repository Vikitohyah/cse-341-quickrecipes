const express = require('express');
const router = express.Router();
const validate = require('../middleware/users-validation');
const usersController = require('../controllers/users');
const aunthenticate = require('../middleware/authenticate');

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);

router.post('/',
    aunthenticate.isAuthenticated,
    validate.createUsersRules(),
    validate.checkErrors,
    usersController.createUsers)
    
router.put('/:id',
    aunthenticate.isAuthenticated,
    validate.updateUserRules(),
    validate.checkErrors,
    usersController.updateUser);
    
router.delete('/:id',
    aunthenticate.isAuthenticated,
    usersController.deleteUser);

module.exports = router;