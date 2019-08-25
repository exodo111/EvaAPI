//Librerías
const express = require('express');
const controller = require('./characters.controller');

const router = express.Router();

//Mapeo del request GET - Corresponde a api/characters/
router.get('/', controller.get);
router.get('/:user',controller.findLocalCharacters);
router.post('/',controller.addCharacter);
module.exports = router;
