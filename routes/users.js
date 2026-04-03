const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const { route } = require('./swagger');

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);

router.post('/', usersController.createUsers)

module.exports = router;