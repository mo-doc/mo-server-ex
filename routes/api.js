var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/user', function(req, res) {
  res.json({code:200})
});

module.exports = router;
