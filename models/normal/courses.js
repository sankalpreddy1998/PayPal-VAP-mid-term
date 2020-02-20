var mongoose = require('mongoose');  //import mongoose class and assign to variable
var Schema = mongoose.Schema;        //take sub class Schema and assign to variable

var courses_schema = new Schema({    //define the schema
    name:{
        type: String
    },
    code:{
        type:String
    },
    credits:{
        type: Number
    },
});

var courses = mongoose.model('courses',courses_schema);  //create the model(fuse: collection name , schema)

module.exports = courses; //export the model