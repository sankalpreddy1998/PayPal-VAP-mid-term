//----------------------------------------------------contents----------------------------------------------------

/*

Slot Controller: controller for CRUD operations for Slot

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

var slots = require('../../models/normal/slots');

//----------------------------------------------------section 2----------------------------------------------------

module.exports = function(app){


    //section 2.1 - admin



        //read slot
        
        app.get('/admin/dashboard/slots', (req, res) => {
            if(!req.session.admin_id){
                res.redirect('/')
            }
            else{
                slots.find({}).then((slots)=>{
                    res.render('admin/slots',{slots:slots})
                })
            }
        })

        


        //create slot
        
        app.post('/admin/dashboard/slots/add_slot', (req, res) => {
            if(!req.session.admin_id){
                res.redirect('/')
            }
            else{
                let name = req.body.name;
                let time = req.body.time;
                
                console.log({name:name,time:time});

                var rec = new slots({name:name,time:time});                       //create record
                rec.save();                                                       //save record
                
                res.redirect('/admin/dashboard/slots')
            }
        })



    
        //update slot
        
        app.post('/admin/dashboard/slots/edit_slot/:id',function(req, res){
            if(!req.session.admin_id){
                res.redirect('/')
            }
            else{
                slots.findByIdAndUpdate(req.params.id,{ time:req.body.time,name:req.body.name },function(){    //function:  findByIdAndUpdate(id,what_to_update,function)
                    console.log('event updated');
                }).then(()=>{
                    res.redirect('/admin/dashboard/slots') 
                })
            }
        });




        //delete slot
        
        app.post('/admin/dashboard/slots/delete_slot/:id',function(req, res){
            if(!req.session.admin_id){
                res.redirect('/')
            }
            else{
                slots.findByIdAndRemove(req.params.id,function(){         //function:  findByIdAndRemove(id,function)
                console.log('event deleted');
                }).then(()=>{
                    res.redirect('/admin/dashboard/slots') 
                })
            }
        });
};


//----------------------------------------------------end----------------------------------------------------