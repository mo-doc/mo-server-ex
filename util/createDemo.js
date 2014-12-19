var querystring = require('querystring');
var _ =require("underscore");
var fs = require("fs");

function _createDemo(attr){
    fs.writeFileSync("yyy.html", "dsfasd", function(){

    })
}


module.exports =  function(req,res,callback){
  var param = req.body;
  var _package = {};

  try{
    _package = (param.package && (JSON.parse(param.package))) || {};
  }catch(e){
      res.json({code:500,msg:"package文件出错"})
  }
  ['name','version','keywords'].forEach(function(key){
    if(!(key in _package)){
      res.json({code:500,msg:"package.json文件关键属性"+key+"缺失"});
    }
  });

  if(!req.body.demo){
    res.json({code:500,msg:"demo不存在"})
  }

  if(!req.body.intro){
    res.json({code:500,msg:"文档不存在"})
  }


  _createDemo({
    demo:param.demo,
    intro:param.intro,
    package:_package
  })

  res.end();
}