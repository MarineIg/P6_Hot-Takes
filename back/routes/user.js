// Importations 
const express = require('express');

const router = express.Router();

const userCtrl = require('../controllers/user');

// Endpoints
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// Exporation
module.exports = router;