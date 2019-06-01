var express = require('express');

var router = express.Router();

var user_md = require('../Respo/Res');


router.get('/Sign-up', function (req, res) {
    res.render('Sign-up', {data:{}});
});

router.post('/Sign-up', function (req, res) {
    var user = req.body;

    console.log('signup');
    if (user.email.trim().length === 0)
    {
        res.render('Sign-up', {data: {error: "Email is required"}});
    }
    
    if (user.passwd !== user.repasswd && user.passwd.trim().length !== 0)
    {
        console.log('error repass');
        res.render('Sign-up', {data : {error: "Password is not Match"}});
    }

    // Insert to Database
    user = {
        email: user.email,
        password: user.passwd,
        first_name: user.firstname,
        last_name: user.lastname
    };
    var result = user_md.addUsers(user);

    result.then(function (data) {
        res.redirect('Login');
    }).catch(function (err) {
        res.render('Sign-up', {data: {error: 'error'}})
    })
})

router.get('/Login', function (req, res) {
    console.log('go to login2')
    res.render('Login');
})

router.post('/Login', function (req, res) {
    console.log('body',req.body);
    var email = req.body.email
    user_md.loadByEmail(email).then((rows) => {   
            console.log(rows);
            console.log(req.body.password);
            if (rows[0].password === req.body.password) {
                res.redirect('/index/Dashboard');
            }
            else {
                console.log('efg');
                res.json({message:'Login Fail'});
                var abc = {status: 'fail'}
                return abc
            }
    })
})

router.post('/Login_2', function (req, res) {
    console.log('body',req.body);
    var email = req.body.email
    user_md.loadByEmail(email).then((rows) => {   
            console.log(rows);
            console.log(req.body.password);
            if (rows[0].password === req.body.password) {
                var loginform = {
                    email: req.body.email,
                    password: req.body.password,
                }
                console.log(loginform);
                    return res.status(200).json({
                        loginform: loginform,
                        status: 'success'
                    })
                
            }
                else {
                    console.log('efg');
                    res.json({message:'Login Fail'});
                    var abc = {status: 'fail'}
                    return abc
                }
    })
})

module.exports = router;