
let users = [];

let projects = [
    {
        name:'First Project',
        description: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
        imgSrc: '/image/ashu.JPG',
        gitHubLink:'http://www.github.com',
        uName:'first-project'
    },
    {
        name:'Second Project',
        description: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
        imgSrc: '/image/ashu.JPG',
        gitHubLink:'www.github.com',
        uName:'second-project'

    },
    {
        name:'Third Project',
        description: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
        imgSrc: '/image/ashu.JPG',
        gitHubLink:'http://www.github.com',
        uName:'third-project'

    }
]


module.exports.index = (req,res) => {
    res.render('index',{
        title:'HBS',
        layout: 'layout',
        nav : true,
        navHome : true,
        footer : true,
        projects: projects
    })
};

module.exports.contact = (req,res) => {
    res.render('contact', {
        title: 'Contact Us',
        layout: 'layout',
        nav : true,
        navContact : true,
        footer : true
    })
}

module.exports.signup = (req,res) => {
    res.render('signup', {
        title:'Sign up',
        layout: 'layout',
        nav : false,
       
        extraCss: ['/css/signin.css'],
        footer : false
    })
}

module.exports.doSignup = (req, res) => {

    let email = req.body.email;
    let password = req.body.password;
    // validate i
    req.checkBody('email', 'Email is required').notEmpty().withMessage('Email cannot be empty').isEmail().withMessage('Please provide valid email');

    req.checkBody('password', 'Password is required').notEmpty();
    let errors = req.validationErrors();
    console.log(errors)

    if(errors) {
        let messages = [];
        errors.forEach((error) => messages.push(error.msg));
        res.render('signup', {
            title:'Sign up',
            layout: 'layout',
            nav : false,
            footer : false,
            messages : messages
        });
    }else {
        let data = req.body;
        users.push(data)
        console.log(users);
        res.redirect('/')
    }
}

module.exports.login = (req,res) => {
    res.render('login', {
        title:'Login',
        layout : 'layout',
        nav : false,
        extraCss: ['/css/signin.css'],
        footer : false
    })
}

module.exports.dashBoard = (req,res) => {
    res.render('dashboard', {
        title: 'Dashboard',
        layout: 'layout',
        nav : true,
        navDashboard: true,
        footer: true,
    })
}

module.exports.doLogin = (req,res) => {
    
    let email = req.body.email;
    let password = req.body.password;

    var user = users.filter((user) => user.email == email && user.password == password)

    if(user && user.length > 0){
        req.session.isAuthenticated = true

        res.redirect('/dashboard')
    }else {
        res.send('Credentials not match')
    }
}

module.exports.logout = (req,res) => {
    req.session.isAuthenticated = false;
    res.redirect('/')
}


module.exports.projectDetail = (req,res) => {
    let uName = req.params.uName;
    
    let project = projects.filter((pro) => pro.uName == uName)
    
    console.log(project[0])

    res.render('project-detail', {
        title: 'Project Detail',
        layout:'layout',
        nav : true,
        footer:true,
        project: project[0]
    })
}