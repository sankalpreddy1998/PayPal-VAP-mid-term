var mongoose = require('mongoose');  //import mongoose class and assign to variable
var Schema = mongoose.Schema;        //take sub class Schema and assign to variable

var students_schema = new Schema({    //define the schema
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

var students = mongoose.model('students',students_schema);  //create the model(fuse: collection name , schema)

module.exports = students; //export the model