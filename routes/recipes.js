const express = require('express');
const router = express.Router();

const recipesController = require('../controllers/recipes');
const { route } = require('./swagger');

router.get('/', recipesController.getAll);
router.get('/:id', recipesController.getSingle);

router.post('/', recipesController.createRecipes)

module.exports = router;