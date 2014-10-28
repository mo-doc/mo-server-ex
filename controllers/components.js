
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var async = require('async');
var markdown = require( "markdown" ).markdown;

var Component = mongoose.model('Component');


var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');
/**
 * Create an Component
 */

exports.create = function (req, res) {
  var component = new Component(req.body);
  component.save(function (err) {
     if (err) return res.json({code:500,msg:err.message});
     res.json({code:200});
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
  Component.find(req.body,function(err,doc){
    if (err) return res.json({code:500,msg:err.message});
     res.json(doc);
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
  var tasks=[{classify:'util'},{classify:'base'},{classify:'server'}],
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
  var tasks=[{title:valReg},{keyword:valReg}],
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
