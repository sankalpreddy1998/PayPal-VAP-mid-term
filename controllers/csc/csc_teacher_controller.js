
//----------------------------------------------------contents----------------------------------------------------

/*

Teacher Controller: controller for activities of the teacher(login,registration etc..)

Contents:
    1. importing libraries and models
    2. function declaration and definition
        2.1 get available courses
        2.2 get list of registered courses
        2.3 register to course
    3. route methods
        3.1 get - /teacher -> teacher login page
        3.2 get - /teacher/logout -> teacher logout
        3.3 get - /teacher/dashboard -> dashboard of teacher
        3.4 get - /teacher/register -> get registration panel
        3.5 get - /teacher/registered -> view list of registered courses
        3.6 post - /teacher/register/register_course/:id -> register for selected course

*/

//----------------------------------------------------section 1----------------------------------------------------



var _ = require('lodash');

var classes = require('../../models/normal/classes');
var courses = require('../../models/normal/courses');
var slots = require('../../models/normal/slots');
var students = require('../../models/normal/students');
var teachers = require('../../models/normal/teachers');

var csc = require('../../models/csc/csc');
var csc_teacher = require('../../models/csc/csc_teacher');



//----------------------------------------------------section 2----------------------------------------------------


//section 2.1

const mapped_csc_data =  async (a) => {
    var courses_var = await courses.find({});                   //await data from database
    var slots_var = await slots.find({});
    var classes_var = await classes.find({});
    var csc_var = await csc.find({});
    var csc_teacher_var = await csc_teacher.find({});

    var csc_var1 = []
    _.forEach(csc_teacher_var,(csc_t)=>{                        //get list of available courses
        let y = _.find(csc_var,{'_id':csc_t.c})
        csc_var1.push(y)
    })
    var csc_var2 = _.difference(csc_var, csc_var1);             


    var arr = []
    _.forEach(csc_var2,(value)=>{                               //populate the data
        arr.push({
            'id':value.id,
            'class':_.find(classes_var,{'_id':value.class}),
            'slot':_.find(slots_var,{'_id':value.slot}),
            'course':_.find(courses_var,{'_id':value.course})
        })
    })
    
    return({'mapped_data':arr})
}







//section 2.2

const registered_course_data =  async (a) => {
    var courses_var = await courses.find({});                       //await data from database
    var slots_var = await slots.find({});
    var classes_var = await classes.find({});
    var csc_var = await csc.find({});
    var teacher = await teachers.find({'_id':a});
    var csc_teacher_var = await csc_teacher.find({teacher:a});

    var csc_var1 = []
    _.forEach(csc_teacher_var,(csc_t)=>{                            //get list of registered courses
        let y = _.find(csc_var,{'_id':csc_t.c})
        csc_var1.push(y)
    })


    var arr = []
    _.forEach(csc_var1,(value)=>{                                    //populate data
        arr.push({
            'id':value.id,
            'class':_.find(classes_var,{'_id':value.class}),
            'slot':_.find(slots_var,{'_id':value.slot}),
            'course':_.find(courses_var,{'_id':value.course})
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
    
    return({'mapped_data':arr,'time_table':a1,'current_credits':teacher[0].credits})
}








//section 2.3

const register_course = async(csc_id,teacher_id) => {
    var csc_var = await csc.find({'_id':csc_id});                         //await data from database
    var teacher_var = await teachers.find({'_id':teacher_id});
    var course_var = await courses.find({'_id':csc_var[0].course});
    var c = teacher_var[0].credits+course_var[0].credits;

    var rec = new csc_teacher({c:csc_id,teacher:teacher_id});    //create record
    
    console.log([course_var[0],teacher_var[0]]);
    
    if (c>27) {
        return false
    } else {
        teachers.findByIdAndUpdate(teacher_id,{credits:c},function(){             //function:  findByIdAndUpdate(id,what_to_update,function)
            rec.save().then(()=>{
                return true
            })
        })   
    }
}



//----------------------------------------------------section 3----------------------------------------------------


module.exports = function(app){




    //section 3.1

    app.get('/teacher', (req, res) => {
        
        res.render('teacher/home')
    
    })



    //section 3.2

    app.get('/teacher/logout', (req, res) => {
    
        req.session.destroy();
        res.render('teacher/home')
    
    })
    



    //section 3.3

    app.post('/teacher/dashboard', (req, res) => {
        
        let reg_no = req.body.email;                                        //get credentials
        let password = req.body.password;
                
        teachers.findOne({reg_no:reg_no}).then((teacher)=>{                 //find teacher

            if(teacher.password==password){                                 //verify password
                
                req.session.teacher_id = teacher.id;                         //set session
                req.session.name = teacher.name+" ("+teacher.reg_no+") ";
                
                res.render('teacher/dashboard',{name:req.session.name})
            }
            else{
                res.render('error',{message:'You entered the wrong password' })
            }
        }).catch(()=>{
            res.render('error',{message:'You entered the wrong username' })
        })

    })




    //section 3.4

    app.get('/teacher/register', (req, res) => {
        if(!req.session.teacher_id){                                    //check sessions
            res.redirect('/')
        }
        else{

            mapped_csc_data(req.session.teacher_id).then((data)=>{      //get list of available courses
                
                data.name=req.session.name;
                res.render('teacher/register',data)
            
            }).catch((err)=>{console.log(err)})
        
        }
    })




    //section 3.5

    app.get('/teacher/registered', (req, res) => {
        if(!req.session.teacher_id){                                        //check session
            res.redirect('/')
        }
        else{        

            registered_course_data(req.session.teacher_id).then((data)=>{   //get registered courses

                data.name=req.session.name;
                res.render('teacher/registered',data)
            
            }).catch((err)=>{console.log(err)})
        }
    })




    //section 3.6

    app.post('/teacher/register/register_course/:id', (req, res) => {
        if(!req.session.teacher_id){                                         //check session
            res.redirect('/')
        }
        else{ 

            register_course(req.params.id,req.session.teacher_id) 
            .then((ans)=>{
                if(ans)
                    res.redirect('/teacher/registered')
                else    
                res.redirect('/teacher/registered')
            }).catch((err)=>{
                console.log(err);
            })                                                               //save record
      
        }
    })


};


//----------------------------------------------------end----------------------------------------------------