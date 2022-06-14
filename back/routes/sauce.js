// Importations
const express = require('express');
const router = express.Router();

// Importation du controller
const sauceCtrl = require('../controllers/sauce');
const likeCtrl = require('../controllers/like');

// Importation des middlewares
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const sauceSecurity = require('../middleware/sauceSecurity');


// Les différentes routes
router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/', auth, sauceCtrl.getAllSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, sauceSecurity, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceSecurity, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, likeCtrl.likeDislikeSauce);


// Exportation du router
module.exports = router;
