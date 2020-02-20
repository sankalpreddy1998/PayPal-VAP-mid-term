var mongoose = require('mongoose');  //import mongoose class and assign to variable
var Schema = mongoose.Schema;        //take sub class Schema and assign to variable

var csc_student_schema = new Schema({    //define the schema
    c:{
        type: Schema.ObjectId,
        ref: 'csc_teacher'
    },
    student:{
        type: Schema.ObjectId,
        ref: 'student'
    },
});

var csc_student = mongoose.model('csc_student',csc_student_schema);  //create the model(fuse: collection name , schema)

module.exports = csc_student; //export the model