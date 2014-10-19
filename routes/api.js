var express = require('express');
var router = express.Router();


var components = require('../controllers/components');
/* GET users listing. */
router.post('/component',components.create);

module.exports = router;
