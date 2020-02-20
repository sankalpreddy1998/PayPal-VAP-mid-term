const express = require('express');
var parseurl = require('parseurl');
var session = require('express-session');
var bodyParser = require("body-parser");
var mongoose = require('mongoose');


//init app
const app = express()
const port = 5000



//Load View Engine
app.set('views','./views')
app.set('view engine', 'pug')



//configur express to use middle-ware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies 
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))


//Link public files
app.use(express.static('public'))



//mongoose integration
mongoose.connect('mongodb://localhost/v_pal');       //connect with mongodb
mongoose.Promise = global.Promise;                   //global promise ?????



//import controllers
var admin_controller = require('./controllers/admin_controller');

var csc_controller = require('./controllers/csc/csc_controller')
var csc_student_controller = require('./controllers/csc/csc_student_controller');
var csc_teacher_controller = require('./controllers/csc/csc_teacher_controller');

var classes_controller = require('./controllers/normal/classes_controller');
var courses_controller = require('./controllers/normal/courses_controller');
var slots_controller = require('./controllers/normal/slots_controller');
var student_controller = require('./controllers/normal/student_controller');
var teacher_controller = require('./controllers/normal/teacher_controller');




//use controllers
admin_controller(app);

csc_controller(app);
csc_student_controller(app);
csc_teacher_controller(app);

classes_controller(app);
courses_controller(app);
slots_controller(app);

student_controller(app);
teacher_controller(app);




//index page
app.get('/',(req,res)=>{
    res.render('index')
})



app.listen(port, () => console.log("Server running"))