//----------------------------------------------------contents----------------------------------------------------

/*
Teacher Controller: controller for CRUD operations for Teacher

Contents:
    1. importing libraries and models
    2. method declaration and definition
    3. route methods
        3.1 admin
            3.1.1 read
            3.1.2 create
            3.1.3 update
            3.1.4 delete
*/

//----------------------------------------------------section 1----------------------------------------------------

var _ = require('lodash');

var classes = require('../../models/normal/classes');
var courses = require('../../models/normal/courses');
var slots = require('../../models/normal/slots');

var csc = require('../../models/csc/csc');

//----------------------------------------------------section 2----------------------------------------------------


const mapped_course_data =  async () => {
    var courses_var = await courses.find({});
    var slots_var = await slots.find({});
    var classes_var = await classes.find({});
    var csc_var = await csc.find({});

    var arr = []
    _.forEach(csc_var,(value)=>{
        arr.push({
            'id':value.id,
            'class':_.find(classes_var,{'_id':value.class}),
            'slot':_.find(slots_var,{'_id':value.slot}),
            'course':_.find(courses_var,{'_id':value.course})
        })
    })
    console.log(arr);
    
    return({'data':{courses:courses_var,slots:slots_var,classes:classes_var},'mapped_data':arr})
}


//----------------------------------------------------section 3----------------------------------------------------

module.exports = function(app){
    


    //section 3.1

    app.get('/admin/dashboard/csc', (req, res) => {
        if(!req.session.admin_id){
            res.redirect('/')
        }
        else{
            mapped_course_data()
            .then((data)=>{
                console.log(data);
                res.render('admin/csc',data)
            })
        }
    })

    


    //section 3.2

    app.post('/admin/dashboard/csc/add_csc', (req, res) => {
        if(!req.session.admin_id){
            res.redirect('/')
        }
        else{
            var rec = new csc(req.body);   //create record
            rec.save();                    //save record
            
            res.redirect('/admin/dashboard/csc'); 
        }
    })

    


    //section 3.3

    app.post('/admin/dashboard/csc/edit_csc/:id',function(req, res){
        if(!req.session.admin_id){
            res.redirect('/')
        }
        else{
            csc.findByIdAndUpdate(req.params.id,{slot:req.body.slot,class:req.body.class,course:req.body.course},function(){    //function:  findByIdAndUpdate(id,what_to_update,function)
                console.log('event updated');
            }).then(()=>{
                res.redirect('/admin/dashboard/csc') 
            })
        }
    });

    


    //section 3.4

    app.post('/admin/dashboard/csc/delete_csc/:id',function(req, res){
        if(!req.session.admin_id){
            res.redirect('/')
        }
        else{
            csc.findByIdAndRemove(req.params.id,function(){         //function:  findByIdAndRemove(id,function)
                console.log('event deleted');
            }).then(()=>{
                res.redirect('/admin/dashboard/csc') 
            })
        }
    });
}

//----------------------------------------------------end----------------------------------------------------