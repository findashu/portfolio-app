const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const app = express();
const validator = require('express-validator');
const session = require('express-session');
const midleware = require('./middleware/appmiddleware')
const routeHandler = require('./routes/index');
//set view engine
app.set('views', __dirname+'/views');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname+'/views/partials')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use(session({
    secret:'my secret',
    saveUninitialized: false,
    resave: false,
    cookie: {maxAge : 30 * 24 * 60 * 1000}
}));




app.use(validator());

app.use(express.static(__dirname+'/static'));
app.use(midleware.logger);


function auth(req,res,next) {
    if(req.session && req.session.isAuthenticated) {
       return next()
    }
    res.redirect('/login')
}


app.get('/test', (req, res) => {
    req.session.name = 'ashu'
    res.send('Working with session')
})

app.get('/', routeHandler.index);

app.get('/contact', routeHandler.contact)

app.get('/sign-up', routeHandler.signup);

app.post('/sign-up', routeHandler.doSignup);

app.get('/login', routeHandler.login);

app.post('/login', routeHandler.doLogin);

app.get('/dashboard', auth, routeHandler.dashBoard);

app.get('/logout', routeHandler.logout);

app.get('/:uName',  routeHandler.projectDetail);

app.listen(3000, () => console.log('Server up and running on port 3000'))