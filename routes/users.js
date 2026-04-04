const express = require('express');
const router = express.Router();
const validate = require('../middleware/users-validation');

const usersController = require('../controllers/users');

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);

router.post('/',
    validate.createUsersRules(),
    validate.checkErrors,
    usersController.createUsers)
    
router.post('/', usersController.createUsers)
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;