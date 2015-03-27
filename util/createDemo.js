var querystring = require('querystring');
var _ =require("underscore");
var fs = require("fs");
var mkdirp = require("mkdirp");
var sh = require("execSync");
var cp =require("child_process");

function _createDemo(attr,res){
    //建立代码库
    mkdirp("demo/");
    var ls = cp.exec("cd demo; "+
       "rm -rvf "+attr.package['name']+"; "+
       "git clone "+attr.package["repository"]+"; "+
       "cd "+ attr.package['name']+"; "+
       "npm install; "+
       "gulp; "+
       "cortex install; "+
       "cortex build; "+
       "exit 1;"
    );

   ls.stdout.on('data', function (data) {
        console.info(data);
    });

    ls.stderr.on('data', function (data) {
        console.info(data);
    });

    ls.on('exit', function (code) {
        
    });
   
}

module.exports =  function(req,res,callback){
  var param = req.body;
  var _package = {};


  try{
    _package = (param.package && (JSON.parse(param.package))) || {};
  }catch(e){
      res.json({code:500,msg:"package文件出错"})
  }
  ['name','version','keywords','repository','classify'].forEach(function(key){
    if(!(key in _package)){
      res.json({code:500,msg:"package.json文件关键属性"+key+"缺失"});
    }
  });

  if(!req.body.intro){
    res.json({code:500,msg:"文档不存在"})
  }

  _createDemo({
    package:_package
  },res)

  return true;
}