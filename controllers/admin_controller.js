module.exports = function(app){

    app.get('/admin', (req, res) => {
        res.render('admin/home')
    })
    
    app.post('/admin/dashboard', (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        if(email==="admin@gmail.com"&&password==="admin123")
        {
            req.session.admin_id="admin123"
            res.render('admin/dashboard')
        } 
        else{
            res.render('error',{message:'You entered a wrong username or password' })
        }
    })

    app.get('/admin/logout', (req, res) => {
        req.session.destroy();
        res.render('admin/home')
    })

};
