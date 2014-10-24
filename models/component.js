
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
  title: {type : String, default : '', trim : true},
  intro: {type : String, default : '', trim : true},
  demo: {type : String, default : '', trim : true},
  codelink: {type : String, default : '', trim : true},
  verify: {type : Number, default : 1},
  comments: [{
    body: { type : String, default : '' },
    user: { type : Schema.ObjectId, ref : 'User' },
    createdAt: { type : Date, default : Date.now }
  }],
  keywords: {type: [], get: getTags, set: setTags},
  classify:{type:String, default:'',trim:true},
  createdAt  : {type : Date, default : Date.now}
});

/**
 * Validations
 */

//ComponentSchema.path('title').required(true, 'Article title cannot be blank');
//ComponentSchema.path('intro').required(true, 'Article body cannot be blank');


/**
 * Methods
 */

ComponentSchema.methods = {

}



mongoose.model('Component', ComponentSchema);
