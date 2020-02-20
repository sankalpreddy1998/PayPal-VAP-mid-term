var mongoose = require('mongoose');  //import mongoose class and assign to variable
var Schema = mongoose.Schema;        //take sub class Schema and assign to variable

var csc_schema = new Schema({    //define the schema
    slot:{
        type: Schema.ObjectId,
        ref: 'slots'
    },
    class:{
        type: Schema.ObjectId,
        ref: 'classes'
    },
    course:{
        type: Schema.ObjectId,
        ref: 'courses'
    },
});

var csc = mongoose.model('csc',csc_schema);  //create the model(fuse: collection name , schema)

module.exports = csc; //export the model