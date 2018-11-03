var express = require('express');
const router = express.Router();
const data = require('../seed-data')
const md5 = require('js-md5');
const Client = require('node-rest-client').Client;
const client = new Client();

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
        var args = {
            headers: {
                "Content-Type": "application/json",
                "Accepts": 'application/json'
            },
            data: req.body
        }

        client.post('http://localhost:3003/signup', args, function (data, response) {

            if (data && data.err == undefined) {
                res.redirect('/login')
            } else {
                console.log(data.error);
                res.render('signup', {
                    title: 'Sign up',
                    layout: 'layout-signin',
                    nav: false,
                    extraCss: ['/css/signin.css'],
                    footer: false,
                    messages: [data.message]
                });
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

    var args = {
        headers: {
            "Content-Type": "application/json",
            "Accepts": 'application/json'
        },
        data: req.body
    }

    client.post('http://localhost:3003/login', args, function(data,response)  {
        if(data.data) {
            req.session.isAuthenticated = true;
            req.session.user = data.data;
            res.locals.user = data.data;
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
    })
});

router.get('/logout', (req, res) => {
    req.session.isAuthenticated = false;
    delete req.session.user;
    res.redirect('/')
});

module.exports = router;
