var express = require('express')
const router = express.Router();
const data = require('../my-data.json');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const unzip = require('unzip');
const mediaService = require('../services/mediaService');

var storage = multer.diskStorage({
    destination: function(req,file,callback) {
        callback(null, path.join(__dirname,'../uploads'))
    },
    filename: function(req,file, callback) {
        console.log(JSON.stringify(file));
        callback(null, file.originalname)
    }
})

var upload = multer({storage: storage}).single('image');

function getProject(alias) {
    if (alias) {
        var index = parseInt(data.projectIndex[alias]);
        return data.myProjects[index];
    } else {
        return data.myProjects
    }
}

router.get('/', function(req,res) {
    res.render('admin/dashboard', {
        layout:"layout-dashboard",
        title: 'Admin Dashboard',
        navDashBoard : true,
    })
})


router.get('/projects', function(req,res) {
    res.render('admin/projects', {
        layout:"layout-dashboard",
        title: 'Project Admin',
        navProjects : true,
        projects : getProject()
    })
})

router.get('/projects/create', function(req,res) {
    res.render('admin/project-create', {
        layout:"layout-dashboard",
        title: 'Project Admin',
        navProjects : true
    })
});

router.post('/projects/create', function(req,res) {
    var inputData = req.body;
    data.myProjects.push(inputData);
    var index = Object.keys(data.projectIndex).length;
    data.projectIndex[inputData.alias] = index;
    var jsonData = JSON.stringify(data);

    fs.writeFile('my-data.json', jsonData, function(err) {
        if(err){
            return console.log(err);
        }
        console.log('Project Saved');
        res.redirect('/admin/projects');
    })
})


router.get('/media', (req,res) => {
    res.render('admin/upload', {
        title:'Image Upload',
        layout:'layout-dashboard',
        navProjects:true
    })
})

router.post('/media', function(req,res) {
    upload(req,res, function(err) {
        if(err) {
            console.log(err);
            return res.end('Error uploading')
        }
        res.end('File uploaded successfully')
    });
})

router.get('/project/:projectAlias', (req,res) => {
    var alias = req.params.projectAlias;
    res.render('admin/project-detail', {
        title:'Project Detail',
        layout:'layout-dashboard',
        navProjects:true,
        project:getProject(alias)
    })
})

router.post('/project/:projectAlias/update', (req,res) => {
    var inputData = req.body;
    console.log(inputData);
    res.send('Updated');
})


router.get('/project/:projectAlias/delete', (req,res) => {
   
    res.send('Deleted');
})

router.get('/project/:projectAlias/uploaddemo', (req,res) => {
    var alias = req.params.projectAlias;
    res.render('admin/upload', {
        title:'Image Upload',
        layout:'layout-dashboard',
        navProjects:true,
        actionUrl : '/admin/project/'+alias+'/uploaddemo'
    })
})

router.post('/project/:projectAlias/uploaddemo',(req,res) => {
    var pAlias = req.params.projectAlias;
    var dir = path.join(__dirname,'../static/project-demos/'+pAlias)

    var finishUpload = function (err ,data) {
        if(err) {
            console.log(err)
        }else {
            // unzip the contents to the same folder
            var zipfile = dir + '/' + pAlias + '.zip';

            fs.createReadStream(zipfile).pipe(unzip.Extract({path: dir}));
            fs.unlinkSync(zipfile);
            res.send('Done');
        }
    }
    mediaService.uploadMedia(req,res, dir, pAlias + '.zip', finishUpload)
})
module.exports = router;