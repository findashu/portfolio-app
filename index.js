const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const app = express();
const midleware = require('./middleware/appmiddleware')

//set view engine
app.set('views', __dirname+'/views');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname+'/views/partials')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname+'/static'));
app.use(midleware.logger);



app.get('/', (req,res) => {
    res.render('index',{
        title:'HBS',
        layout: 'layout'
    });
});

app.get('/contact', (req,res) => {
    res.render('contact', {
        title: 'Contact Us',
        layout: 'layout'
    })
})

app.post('/get-post', (req,res) => {
    var data = req.body
    res.json(data)
})


app.get('/projects', (req,res) => {
    res.render('projects',{
        title:'Projects',
        layout: 'layout'
    })
})

app.listen(3000, () => console.log('Server up and running on port 3000'))