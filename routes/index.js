var express = require('express');
const router = express.Router();
const data = require('../seed-data')
const User = require('../modal/userModal');
const md5 = require('js-md5');

router.get('/', function (req, res) {
    res.render('index', {
        title: 'Ashutosh Mishra',
        layout: 'layout-index'
    })
});

router.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact Us',
        layout: 'layout',
        nav: true,
        navContact: true,
        footer: true
    })
})

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        layout: 'layout',
        nav: true,
        navContact: true,
        footer: true
    })
})

router.get('/resume', (req, res) => {
    res.redirect('/hurreh-tech-interview.pdf')
})

router.get('/sign-up', (req, res) => {
    res.render('signup', {
        title: 'Sign up',
        layout: 'layout-signin',
        nav: false,
        extraCss: ['/css/signin.css'],
        footer: false
    })
})

router.post('/sign-up', (req, res) => {

    let email = req.body.email;
    let password = req.body.password;
    // validate i
    req.checkBody('email', 'Email is required').notEmpty().withMessage('Email cannot be empty').isEmail().withMessage('Please provide valid email');

    req.checkBody('password', 'Password is required').notEmpty();
    let errors = req.validationErrors();
    console.log(errors)

    if (errors) {
        let messages = [];
        errors.forEach((error) => messages.push(error.msg));
        res.render('signup', {
            title: 'Sign up',
            layout: 'layout-signin',
            nav: false,
            extraCss: ['/css/signin.css'],
            footer: false,
            messages: messages
        });
    } else {
    
        let newUser = new User();

        newUser.name = req.body.name;
        newUser.password = md5(req.body.password);
        newUser.email = req.body.email;
        newUser.mobile = req.body.mobile;
        newUser.createdOn = new Date();
        newUser.updatedOn = new Date();
        newUser.save(function(err, user) {
            console.log(JSON.stringify(user))
            if(err) {
                console.log(err);
                res.send(err)
            }else{
                res.redirect('/login')
            }
        })
    }
})

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login',
        layout: 'layout-signin',
        nav: false,
        extraCss: ['/css/signin.css'],
        footer: false
    })
})

router.post('/login', (req, res) => {

    let email = req.body.email;
    let password = md5(req.body.password);

    User.find({email : email, password :password}).then(user => {
        console.log(JSON.stringify(user))
        if(user && user.length > 0) {
            req.session.isAuthenticated = true;
            req.session.user = user[0];
            res.locals.user = user[0];
            res.redirect('/admin');
        }else {
            res.render('login', {
                title: 'Login',
                layout: 'layout-signin',
                nav: false,
                extraCss: ['/css/signin.css'],
                footer: false
            })
        }
    }).catch(err => {
        console.log(err);
    })
});
    
router.get('/logout', (req, res) => {
    req.session.isAuthenticated = false;
    delete req.session.user;
    res.redirect('/')
});

module.exports = router;
