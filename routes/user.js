
const express = require('express');
const router = express.Router();
const { afficherUser } = require('../controller/validController');
const { usrId } = require('../middleware/user');
const { rerquireSign_In, isData,adminstration  } = require('../middleware/validation');
router.get('/affiche/:utilisateurId', rerquireSign_In, isData,adminstration ,afficherUser );
router.param('utilisateurId',usrId)

module.exports = router;