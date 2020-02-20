//----------------------------------------------------contents----------------------------------------------------

/*

Courses Controller: controller for CRUD operations for courses

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

var courses = require('../../models/normal/courses');

//----------------------------------------------------section 2----------------------------------------------------

module.exports = function(app){


    //section 2.1 - admin



        //read course
        
        app.get('/admin/dashboard/courses', (req, res) => {
            if(!req.session.admin_id){
                res.redirect('/')
            }
            else{
                
                courses.find({}).then((courses)=>{
                    res.render('admin/courses',{courses:courses})
                })
            
            }
        })

        


        //create course
        
        app.post('/admin/dashboard/courses/add_course', (req, res) => {
            if(!req.session.admin_id){
                res.redirect('/')
            }
            else{
                let name = req.body.name;
                let code = req.body.code;
                let credits = req.body.credits;
                
                console.log({name:name,code:code,credits:credits});

                var rec = new courses({name:name,code:code,credits:credits});     //create record
                rec.save();                                                       //save record
                
                res.redirect('/admin/dashboard/courses')
            }
        })



    
        //update course
        
        app.post('/admin/dashboard/courses/edit_course/:id',function(req, res){
            if(!req.session.admin_id){
                res.redirect('/')
            }
            else{
                courses.findByIdAndUpdate(req.params.id,{name:req.body.name,code:req.body.code,credits:req.body.credits},function(){    //function:  findByIdAndUpdate(id,what_to_update,function)
                    console.log('event updated');
                }).then(()=>{
                    res.redirect('/admin/dashboard/courses') 
                })
            }
        });



        //delete course
        
        app.post('/admin/dashboard/courses/delete_course/:id',function(req, res){
            if(!req.session.admin_id){
                res.redirect('/')
            }
            else{
                courses.findByIdAndRemove(req.params.id,function(){        
                console.log('event deleted');
                }).then(()=>{
                    res.redirect('/admin/dashboard/courses') 
                })
            }
        });
};

//----------------------------------------------------end----------------------------------------------------