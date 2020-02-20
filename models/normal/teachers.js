var mongoose = require('mongoose');  //import mongoose class and assign to variable
var Schema = mongoose.Schema;        //take sub class Schema and assign to variable

var teachers_schema = new Schema({    //define the schema
    name:{
        type: String
    },
    reg_no:{
        type:String
    },
    password:{
        type: String
    },
    credits:{
        type: Number
    },
});

var teachers = mongoose.model('teachers',teachers_schema);  //create the model(fuse: collection name , schema)

module.exports = teachers; //export the model