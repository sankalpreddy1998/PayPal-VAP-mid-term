
//----------------------------------------------------contents----------------------------------------------------

/*

CSC Student Controller: controller for activities of the student regarding registration

Contents:
    1. importing libraries and models
    2. function declaration and definition
        2.1 get available courses
        2.2 get list of registered courses
        2.3 register to course
    3. route methods
        3.1 get - /student -> student login page
        3.2 get - /student/logout -> student logout page
        3.3 get - /student/dashboard -> dashboard of student
        3.4 get - /student/register -> get registration panel
        3.5 get - /student/registered -> view list of registered courses
        3.6 post - /student/register/register_course/:id -> register for selected course

*/

//----------------------------------------------------section 1----------------------------------------------------



var _ = require('lodash');

var classes = require('../../models/normal/classes');
var courses = require('../../models/normal/courses');
var slots = require('../../models/normal/slots');
var students = require('../../models/normal/students');
var teachers = require('../../models/normal/teachers');

var csc = require('../../models/csc/csc');
var csc_student = require('../../models/csc/csc_student');
var csc_teacher = require('../../models/csc/csc_teacher');


//----------------------------------------------------section 2----------------------------------------------------



//section 2.1

const mapped_csc_data =  async (a) => {
    var courses_var = await courses.find({});                                   // await data from database
    var slots_var = await slots.find({});
    var classes_var = await classes.find({});
    var teachers_var = await teachers.find({});
    var csc_var = await csc.find({});
    var csc_teacher_var = await csc_teacher.find({});
    var csc_student_var = await csc_student.find({student:a});

    
    var csc_teacher_var1 = []                                                   //get registered courses under teacher
    _.forEach(csc_student_var,(csc_s)=>{
        let y = _.find(csc_teacher_var,{'_id':csc_s.c})
        csc_teacher_var1.push(y)
    })

    var csc_teacher_var2 = _.difference(csc_teacher_var, csc_teacher_var1);     //get courses that are available and not registered

    var arr = []                                                                
    var value = {}
    _.forEach(csc_teacher_var2,(csc_t)=>{                                       //populate the data
        value = _.find(csc_var,{'_id':csc_t.c})
        
        arr.push({
            'id':csc_t.id,
            'class':_.find(classes_var,{'_id':value.class}),
            'slot':_.find(slots_var,{'_id':value.slot}),
            'course':_.find(courses_var,{'_id':value.course}),
            'teacher':_.find(teachers_var,{'_id':csc_t.teacher})
        })
    })
    
    return({'mapped_data':arr})
}



// section 2.2

const registered_course_data =  async (a) => {
    var courses_var = await courses.find({});                       //await data from database
    var slots_var = await slots.find({});
    var classes_var = await classes.find({});
    var teachers_var = await teachers.find({});
    var student = await students.find({'_id':a});
    var csc_var = await csc.find({});
    var csc_teacher_var = await csc_teacher.find({});
    var csc_student_var = await csc_student.find({student:a});

    var csc_teacher_var1 = []
    _.forEach(csc_student_var,(csc_s)=>{                            //get list of registered courses
        let y = _.find(csc_teacher_var,{'_id':csc_s.c})
        csc_teacher_var1.push(y)
    })

    var arr = []
    var value = {}
    _.forEach(csc_teacher_var1,(csc_t)=>{                           //populate the data
        value = _.find(csc_var,{'_id':csc_t.c})
        
        arr.push({
            'id':csc_t.id,
            'class':_.find(classes_var,{'_id':value.class}),
            'slot':_.find(slots_var,{'_id':value.slot}),
            'course':_.find(courses_var,{'_id':value.course}),
            'teacher':_.find(teachers_var,{'_id':csc_t.teacher})
        })
    })
    
    //gentrate table placeholder data
    var a1 = [
        [['MON'],['A1','lighten-4'],['F1','lighten-4'],['D1','lighten-4'],['B1','lighten-4'],['G1','lighten-4'],['L'],['A2','lighten-4'],['F2','lighten-4'],['D2','lighten-4'],['B2','lighten-4'],['G2','lighten-4']],
        [['TUE'],['B1','lighten-4'],['G1','lighten-4'],['E1','lighten-4'],['C1','lighten-4'],['A1','lighten-4'],['U'],['B2','lighten-4'],['G2','lighten-4'],['E2','lighten-4'],['C2','lighten-4'],['A2','lighten-4']],
        [['WED'],['C1','lighten-4'],['A1','lighten-4'],['F1','lighten-4'],['D1','lighten-4'],['B1','lighten-4'],['N'],['C2','lighten-4'],['A2','lighten-4'],['F2','lighten-4'],['D2','lighten-4'],['B2','lighten-4']],
        [['THU'],['D1','lighten-4'],['B1','lighten-4'],['G1','lighten-4'],['E1','lighten-4'],['C1','lighten-4'],['C'],['D2','lighten-4'],['B2','lighten-4'],['G2','lighten-4'],['E2','lighten-4'],['C2','lighten-4']],
        [['FRI'],['E1','lighten-4'],['C1','lighten-4'],['A1','lighten-4'],['F1','lighten-4'],['D1','lighten-4'],['H'],['E2','lighten-4'],['C2','lighten-4'],['A2','lighten-4'],['F2','lighten-4'],['D2','lighten-4']]
    ]


    //arr data 
    var arr1 = [];
    _.forEach(arr,(val)=>{  
        var nam = val.slot.name+": "+val.course.code+" "+val.class.block+" "+val.class.class_number;
        _.forEach(a1,(day,index_day)=>{  
            _.forEach(day,(s,index_slot)=>{
                if(s[0]==val.slot.name){
                    a1[index_day][index_slot][0]=nam;
                    a1[index_day][index_slot][1]="";
                }  
            })
        })
    })
    
    return({'mapped_data':arr,'time_table':a1,'current_credits':student[0].credits})
}



// section 2.3

const register_course = async(csc_t_id,student_id) => {
    var csc_t_var = await csc_teacher.find({'_id':csc_t_id});                         //await data from database
    var student_var = await students.find({'_id':student_id});
    var csc_var = await csc.find({'_id':csc_t_var[0].c});
    var course_var = await courses.find({'_id':csc_var[0].course});
    var c = student_var[0].credits+course_var[0].credits;

    var rec = new csc_student({c:csc_t_id,student:student_id});    //create record
    
    console.log([course_var[0],student_var[0]]);
    
    if (c>27) {
        return false
    } else {
        students.findByIdAndUpdate(student_id,{credits:c},function(){             //function:  findByIdAndUpdate(id,what_to_update,function)
            rec.save().then(()=>{
                return true
            })
        })   
    }
}




//----------------------------------------------------section 3----------------------------------------------------



module.exports = function(app){


    //section 3.1

    app.get('/student', (req, res) => {
       
        res.render('student/home')
    
    })



    //section 3.2

    app.get('/student/logout', (req, res) => {
       
        req.session.destroy();
        res.render('student/home')
    
    })




    //section 3.3

    app.post('/student/dashboard', (req, res) => {

        let reg_no = req.body.email;                                            //get credentials
        let password = req.body.password;
                
        students.findOne({reg_no:reg_no})
        .then((student)=>{                                                      //find student
            
            if(student.password==password){                                     //verify password
                
                req.session.student_id = student.id                             //set session
                req.session.name = student.name+" ("+student.reg_no+") ";

                res.render('student/dashboard',{name:req.session.name})
            }
            else{
                res.render('error',{message:'You entered the wrong password' })
            }
        }).catch(()=>{
            res.render('error',{message:'You entered the wrong username' })
        })
    })



    
    //section 3.4

    app.get('/student/register', (req, res) => {
        if(!req.session.student_id){                                //check for session
            res.redirect('/')
        }
        else{                                                       //if session is active 

            mapped_csc_data(req.session.student_id).then((data)=>{  //get list of available courses
                
                data.name = req.session.name;
                res.render('student/register',data)
            
            }).catch((err)=>{console.log(err)})
            
        }
    })




    //section 3.5

    app.get('/student/registered', (req, res) => {
        if(!req.session.student_id){                                        //check for session
            res.redirect('/')
        }
        else{                                                               //if session is active        
            
            registered_course_data(req.session.student_id).then((data)=>{   //get list of registered courses

                data.name = req.session.name;
                res.render('student/registered',data)
            
            }).catch((err)=>{console.log(err)})
        
        }
    })




    //section 3.6

    app.post('/student/register/register_course/:id', (req, res) => {
        if(!req.session.student_id){                                                        //check for session
            res.redirect('/')
        }
        else{                                                                               //if session is active

            register_course(req.params.id,req.session.student_id) 
            .then((ans)=>{
                if(ans)
                    res.redirect('/student/registered')
                else    
                    res.redirect('/student/registered')
            }).catch((err)=>{
                console.log(err);
            })
        
        }
    })


};

//----------------------------------------------------end----------------------------------------------------