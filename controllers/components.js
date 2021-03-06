
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var async = require('async');
var markdown = require( "markdown" ).markdown;

var Component = mongoose.model('Component');


var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');

var Demo = require("../util/createDemo");
var _ =require("underscore");
/**
 * Create an Component
 */

exports.create = function (req, res) {
    // 后端建立demo+校验数据完整
    new Demo(req,res);
    
    var _pkg = (req.body && (JSON.parse(req.body.package || "{}"))) || {};

    var component = new Component(
    {
      name:_pkg.name,
      keywords:_.isArray(_pkg.keywords) ? _pkg.keywords.join(" ") : _pkg.keywords.toString(),
      intro:req.body.intro,
      classify:_pkg.classify    
    }
  );

  component.save(function (err) {
      if (err) {
        return res.json({code:500,msg:err.message});
      }
       res.json({code:200});
    });
};

exports.atuocreate = function (req, res) {
  
  // 后端建立demo+校验数据完整
  new Demo(req,res);

  var _pkg = (req.body && (JSON.parse(req.body.package || "{}"))) || {};

  var component = new Component(
    {
      name:_pkg.name,
      keywords:_.isArray(_pkg.keywords) ? _pkg.keywords.join(" ") : _pkg.keywords.toString(),
      intro:req.body.intro,
      classify:_pkg.classify    
    }
  );



  Component.remove({"name":_pkg.name}, function (err) {
    if (err) {
       console.log("删除旧记录失败");
    }
    console.log("删除旧记录成功");
    component.save(function (err) {
      if (err) {
        console.log(err.message);
        return res.json({code:500,msg:err.message});
      }
      console.log("添加成功");
       res.json({code:200});
    });
  });

 

};

/**
 * Remove an Component
 */

exports.remove = function (req, res) {
  Component.remove(req.body, function (err) {
    if (err) return res.json({code:500,msg:err.message});
     res.json({code:200});
  });

};


/**
 * Find an Component
 */

exports.findOne = function (req, res) {
  Component.findOne(req.body,function(err,component){
    if (err) return res.json({code:500,msg:err.message});
    component.intro=markdown.toHTML(decoder.write(component.intro));
    res.json({component:component});
  });
};

/**
 * Find Components
 */

exports.find = function (req, res) {
  Component.find(req.body,function(err,component){
    if (err) return res.json({code:500,msg:err.message});
    component.forEach(function(com,idx){
 	 com.intro=markdown.toHTML(decoder.write(com.intro));
    })
    // component.intro=markdown.toHTML(decoder.write(component.intro));
     res.json(component);
  });
};


/**
 * Update an Component
 */
exports.update=function(req,res){
   Component.update(req.body.select,req.body.update, { multi: true }, function (err, rows, raw) {
    if (err) return res.json({code:500,msg:err.message});
    res.json({rows:rows})
  });
};


/**
 * List Components
 */

exports.listByClassify=function(req,res){
  var tasks=[{classify:'util'},{classify:'base'},{classify:'component'}],
      result=[];
  async.eachSeries(tasks,function(item,callback){
  	Component.find(item,function(err,doc){
	 var obj={classify:item.classify,list:doc}
	  result.push(obj);
	  callback(err, doc);
	});
  },function(err){
     if (err) return res.json({code:500,msg:err.message});
     res.json(result);
  });
}

/**
 * Find Components
 */

exports.keywordFilter = function (req, res) {
  var valReg=new RegExp(req.query.keyword,"i");
  var tasks=[{name:valReg},{keywords:valReg}],
      result=[];
  async.eachSeries(tasks,function(item,callback){
  	Component.find(item,function(err,doc){
	  result=result.concat(doc);
	  callback(err, doc);
	});
  },function(err){
     if (err) return res.json({code:500,msg:err.message});
     result=unique(result);
     res.json(result);
  });
};


/**
 *
 */
exports.addStar = function (req, res){
  Component.findOne({title:req.query.title},function(err,doc){
	if (err) return res.json({code:500,msg:err.message});
	if (!doc) return res.json({code:500,msg:'no such component'});
	var _star=doc.star+1;
	Component.update(doc,{star:_star},function(err,rows){
		if (err) return res.json({code:500,msg:err.message});
    		res.json({code:200,star:_star});
	})
  })
};


/**
 *  Filter Array
 */

function unique (arr){
  var obj = {},newArr = [];
  for(var i = 0;i < arr.length;i++){
    var value = arr[i];
    if(!obj[value]){
      obj[value] = 1;
      newArr.push(value);
    }
  }
  return newArr;
}
