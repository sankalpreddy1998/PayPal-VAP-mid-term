var mongoose = require('mongoose');  //import mongoose class and assign to variable
var Schema = mongoose.Schema;        //take sub class Schema and assign to variable

var classes_schema = new Schema({    //define the schema
    class_number:{
        type: Number
    },
    block:{
        type: String
    }
});

var classes = mongoose.model('classes',classes_schema);  //create the model(fuse: collection name , schema)

module.exports = classes; //export the model