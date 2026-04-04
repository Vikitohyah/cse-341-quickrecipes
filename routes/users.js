const express = require('express');
const router = express.Router();
const validate = require('../middleware/users-validation');

const usersController = require('../controllers/users');
const { route } = require('./swagger');

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);

router.post('/',
    validate.createUsersRules(),
    validate.checkErrors,
    usersController.createUsers)

module.exports = router;