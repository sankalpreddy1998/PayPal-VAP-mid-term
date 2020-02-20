//----------------------------------------------------contents----------------------------------------------------

/*

Classes Controller: controller for CRUD operations for classes

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

var classes = require('../../models/normal/classes');

//----------------------------------------------------section 2----------------------------------------------------

module.exports = function(app){


    //section 2.1 - admin



        //read class

        app.get('/admin/dashboard/classes', (req, res) => {
            if(!req.session.admin_id){
                res.redirect('/')
            }
            else{

                classes.find({}).then((classes)=>{
                    res.render('admin/classes',{classes:classes})
                }) 

            }
        })




        //create class

        app.post('/admin/dashboard/classes/add_class', (req, res) => {
            if(!req.session.admin_id){
                res.redirect('/')
            }
            else{
                let class_number = parseInt(req.body.class_number);
                let block = req.body.block;
                
                console.log({class_number:class_number,block:block});

                var rec = new classes({class_number:class_number,block:block});   //create record
                rec.save();                                                       //save record
                
                res.redirect('/admin/dashboard/classes')
            }
        })




        //update class

        app.post('/admin/dashboard/classes/edit_class/:id',function(req, res){
            if(!req.session.admin_id){
                res.redirect('/')
            }
            else{
                classes.findByIdAndUpdate(req.params.id,{ block:req.body.block,class_number:req.body.class_number },function(){    //function:  findByIdAndUpdate(id,what_to_update,function)
                    console.log('event updated');
                }).then(()=>{
                    res.redirect('/admin/dashboard/classes') 
                })
            }
        });




        //delete class

        app.post('/admin/dashboard/classes/delete_class/:id',function(req, res){
            if(!req.session.admin_id){
                res.redirect('/')
            }
            else{
                classes.findByIdAndRemove(req.params.id,function(){         
                console.log('event deleted');
                }).then(()=>{
                    res.redirect('/admin/dashboard/classes') 
                })
            }
        });
};

//----------------------------------------------------end----------------------------------------------------