
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var async = require('async');

var Component = mongoose.model('Component');



/**
 * Create an Component
 */

exports.create = function (req, res) {
  var component = new Component(req.body);
  component.save(function (err) {
     if (err) return handleError(err);
     res.json({code:200});
  });
};

/**
 * Remove an Component
 */

exports.remove = function (req, res) {
   Component.remove(req.body, function (err) {
    if (err) return handleError(err);
     res.json({code:200});
  });

};


/**
 * Find an Component
 */

exports.findOne = function (req, res) {
  Component.findOne(req.body,function(err,component){
    if (err) return handleError(err);
    res.json({component:component});
  });
};

/**
 * Find Components
 */

exports.find = function (req, res) {
  Component.find(req.body,function(err,doc){
    if (err) return handleError(err);
     res.json(doc);
  });
};


/**
 * Update an Component
 */
exports.update=function(req,res){
   Component.update(req.body.select,req.body.update, { multi: true }, function (err, rows, raw) {
    if (err) return handleError(err);
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
     if (err) return handleError(err);
     res.json(result);
  });
}

