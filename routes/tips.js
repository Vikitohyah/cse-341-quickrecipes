const express = require('express');
const router = express.Router();
const validate = require('../middleware/tips-validation'); 
const tipsController = require('../controllers/tips');
const aunthenticate = require('../middleware/authenticate');

router.get('/', tipsController.getAll);
router.get('/:id', tipsController.getSingle);

router.post('/',
   // aunthenticate.isAuthenticated,
    validate.createTipRules(),
    validate.checkErrors,
    tipsController.createTip)

module.exports = router;