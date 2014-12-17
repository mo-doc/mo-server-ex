var express = require('express');
var router = express.Router();


var components = require('../controllers/components');

/* GET request */
router.all('/component/listbyclassify',components.listByClassify);
router.all('/component/keywordfilter',components.keywordFilter);
router.all('/component/addstar',components.addStar);
router.all('/component/add',components.create);
router.all('/component/findone',components.findOne);
router.all('/component/remove',components.remove);
router.all('/component/update',components.update);
router.all('/component/find',components.find);
router.all('/component/autoadd',components.atuocreate);
/* TEST */
router.post('/test',function(req,res){
res.json(req.body);
})



module.exports = router;
