var express = require('express');
var router = express.Router();


var components = require('../controllers/components');


/* POST request */
router.post('/component/add',components.create);
router.post('/component/findone',components.findOne);
router.post('/component/remove',components.remove);
router.post('/component/update',components.update);
router.post('/component/find',components.find);

/* GET request */
router.get('/component/listbyclassify',components.listByClassify);
router.get('/component/keywordfilter',components.keywordFilter);
router.get('/component/addstar',components.addStar);


/* TEST */
router.post('/test',function(req,res){
res.json(req.body);
})



module.exports = router;
