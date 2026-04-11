const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const { userRules, validate } = require('../middleware/validator');

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);

router.post('/', userRules, validate, usersController.createUsers);
router.put('/:id', userRules, validate, usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;