
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
//var config = require('config');



var Schema = mongoose.Schema;

/**
 * Getters
 */

var getTags = function (tags) {
  return tags.join(',');
};

/**
 * Setters
 */

var setTags = function (tags) {
  return tags.split(',');
};

/**
 * Component Schema
 */

var ComponentSchema = new Schema({
  title: {type : String, trim : true, required: true,index:{unique: true}},
  intro: {type : String, default : '', trim : true, required: true},
  demo: {type : String, default : '', trim : true},
  version: {type : String, default : '', trim : true},
  codelink: {type : String, default : '', trim : true},
  verify: {type : Number, default : 1},
  comments: [{
    body: { type : String, default : '' },
    user: { type : Schema.ObjectId, ref : 'User' },
    createdAt: { type : Date, default : Date.now }
  }],
  keywords: {type: [], get: getTags, set: setTags, required: true},
  star: {type : Number, default : 1},
  classify:{type:String, default:'',trim:true, required: true},
  createdAt  : {type : Date, default : Date.now}
});

/**
 * Validations
 */


/**
 * Methods
 */

ComponentSchema.methods = {

}



mongoose.model('Component', ComponentSchema);
