
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var Component = mongoose.model('Component');



/**
 * Create an article
 */

exports.create = function (req, res) {
  var component = new Component(req.body);
  component.save(function (err) {
     if (err) return handleError(err);
     res.json({code:200});
  });
};

/**
 * Remove an article
 */

exports.remove = function (req, res) {
   Component.remove(req.body, function (err) {
    if (err) return handleError(err);
     res.json({code:200});
  });

};


/**
 * Find an article
 */

exports.findOne = function (req, res) {
  Component.findOne(req.body,function(err,component){
    if (err) return handleError(err);
    res.json({component:component});
  });
};

/**
 * Update an article
 */
exports.update=function(req,res){
   Component.update(req.body.select,req.body.update, { multi: true }, function (err, rows, raw) {
    if (err) return handleError(err);
    res.json({rows:rows})
  });
};

