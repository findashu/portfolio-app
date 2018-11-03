const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const app = express();
const validator = require('express-validator');
const session = require('express-session');
const midleware = require('./middleware/appmiddleware')
const index = require('./routes/index');
const blog = require('./routes/blog');
const project = require('./routes/project');
const admin = require('./routes/admin')
const auth = require('./middleware/auth');


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
app.use(auth.authenticated)

app.use('/', index);
app.use('/project', project)
app.use('/blog', blog);
app.use('/admin', auth.authenticate, admin)



app.listen(3000, () => console.log('Server up and running on port 3000'))

