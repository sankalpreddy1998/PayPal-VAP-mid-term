var mongoose = require('mongoose');  //import mongoose class and assign to variable
var Schema = mongoose.Schema;        //take sub class Schema and assign to variable

var slots_schema = new Schema({    //define the schema
    name:{
        type: String
    },
    time:{
        type:String
    },
});

var slots = mongoose.model('slots',slots_schema);  //create the model(fuse: collection name , schema)

module.exports = slots; //export the model