var express = require('express');
const router = express.Router();
const data = require('../seed-data')





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
        let data = req.body;
        users.push(data)
        console.log(users);
        res.redirect('/')
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
    let password = req.body.password;

    if(data.user.email == email && data.user.password == password) {

        req.session.isAuthenticated = true;
        req.session.user = data.user;
        res.locals.user = data.user;
        console.log('heyeheye')
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
});
    
router.get('/logout', (req, res) => {
    req.session.isAuthenticated = false;
    delete req.session.user;
    res.redirect('/')
});

module.exports = router;
