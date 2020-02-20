//----------------------------------------------------contents----------------------------------------------------

/*

Student Controller: controller for CRUD operations for Student

Contents:
    1. importing libraries and models
    2. route methods
        2.1 admin
            2.1.1 read
            2.1.2 create
            2.1.3 update
            2.1.4 delete

*/

//----------------------------------------------------section 1----------------------------------------------------

var students = require('../../models/normal/students');

//----------------------------------------------------section 2----------------------------------------------------

module.exports = function(app){


    //section 2.1 - admin



        //read student

        app.get('/admin/dashboard/student', (req, res) => {
            if(!req.session.admin_id){
                res.redirect('/')
            }
            else{
                students.find({}).then((students)=>{
                    res.render('admin/students',{students:students})
                })
            }
        })




        //create student

        app.post('/admin/dashboard/students/add_student', (req, res) => {
            if(!req.session.admin_id){
                res.redirect('/')
            }
            else{
                let credits = parseInt(req.body.credits);
                let password = req.body.password;
                let reg_no = req.body.reg_no;
                let name = req.body.name;
                
                var rec = new students({name:name,reg_no:reg_no,password:password,credits:credits});   //create record
                rec.save();                                                                             //save record
                
                res.redirect('/admin/dashboard/student')
            }
        })




        //update student

        app.post('/admin/dashboard/students/edit_student/:id',function(req, res){
            if(!req.session.admin_id){
                res.redirect('/')
            }
            else{
                let credits = parseInt(req.body.credits);
                let password = req.body.password;
                let reg_no = req.body.reg_no;
                let name = req.body.name;

                students.findByIdAndUpdate(req.params.id,{name:name,reg_no:reg_no,password:password,credits:credits},function(){    //function:  findByIdAndUpdate(id,what_to_update,function)
                    console.log('event updated');
                }).then(()=>{
                    res.redirect('/admin/dashboard/student') 
                })
            }
        });




        //delete student

        app.post('/admin/dashboard/students/delete_student/:id',function(req, res){
            if(!req.session.admin_id){
                res.redirect('/')
            }
            else{
                students.findByIdAndRemove(req.params.id,function(){         //function:  findByIdAndRemove(id,function)
                console.log('event deleted');
                }).then(()=>{
                    res.redirect('/admin/dashboard/student') 
                })
            }
        });
};

//----------------------------------------------------end----------------------------------------------------
