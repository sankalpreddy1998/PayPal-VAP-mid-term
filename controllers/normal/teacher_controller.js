//----------------------------------------------------contents----------------------------------------------------

/*

Teacher Controller: controller for CRUD operations for Teacher

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

var teachers = require('../../models/normal/teachers');

//----------------------------------------------------section 2----------------------------------------------------

module.exports = function(app){


    //section 2.1 - admin



        //read teacher

        app.get('/admin/dashboard/teacher', (req, res) => {
            if(!req.session.admin_id){
                res.redirect('/')
            }
            else{
                teachers.find({}).then((teachers)=>{
                    res.render('admin/teachers',{teachers:teachers})
                })
            }
        })




        //create teacher

        app.post('/admin/dashboard/teachers/add_teacher', (req, res) => {
            if(!req.session.admin_id){
                res.redirect('/')
            }
            else{
                let credits = parseInt(req.body.credits);
                let password = req.body.password;
                let reg_no = req.body.reg_no;
                let name = req.body.name;
                
                var rec = new teachers({name:name,reg_no:reg_no,password:password,credits:credits});   //create record
                rec.save();                                                       //save record
                
                res.redirect('/admin/dashboard/teacher')
            }
        })




        //update teacher

        app.post('/admin/dashboard/teachers/edit_teacher/:id',function(req, res){
            if(!req.session.admin_id){
                res.redirect('/')
            }
            else{
                let credits = parseInt(req.body.credits);
                let password = req.body.password;
                let reg_no = req.body.reg_no;
                let name = req.body.name;

                teachers.findByIdAndUpdate(req.params.id,{name:name,reg_no:reg_no,password:password,credits:credits},function(){    //function:  findByIdAndUpdate(id,what_to_update,function)
                    console.log('event updated');
                }).then(()=>{
                    res.redirect('/admin/dashboard/teacher') 
                })
            }
        });




        //delete teacher

        app.post('/admin/dashboard/teachers/delete_teacher/:id',function(req, res){
            if(!req.session.admin_id){
                res.redirect('/')
            }
            else{
                teachers.findByIdAndRemove(req.params.id,function(){         //function:  findByIdAndRemove(id,function)
                console.log('event deleted');
                }).then(()=>{
                    res.redirect('/admin/dashboard/teacher') 
                })
            }
        });
};

//----------------------------------------------------end----------------------------------------------------