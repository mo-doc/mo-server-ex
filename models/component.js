
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
  name: {type : String, trim : true, required: true,index:{unique: true}},
  intro: {type : String, default : '', trim : true, required: true},
  versions: {type : String, default : '', trim : true},
  keywords: {type: [], get: getTags, set: setTags, required: true},
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
