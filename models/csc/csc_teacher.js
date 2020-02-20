var mongoose = require('mongoose');  //import mongoose class and assign to variable
var Schema = mongoose.Schema;        //take sub class Schema and assign to variable

var csc_teacher_schema = new Schema({    //define the schema
    c:{
        type: Schema.ObjectId,
        ref: 'csc'
    },
    teacher:{
        type: Schema.ObjectId,
        ref: 'teacher'
    },
});

var csc_teacher = mongoose.model('csc_teacher',csc_teacher_schema);  //create the model(fuse: collection name , schema)

module.exports = csc_teacher; //export the model