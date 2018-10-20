var express = require('express')
const router = express.Router();
const data = require('../my-data.json');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const unzip = require('unzip');
const mediaService = require('../services/mediaService');
const projectService = require('../services/projectService');


var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, '../uploads'))
    },
    filename: function (req, file, callback) {
        console.log(JSON.stringify(file));
        callback(null, file.originalname)
    }
});



var upload = multer({ storage: storage }).single('image');

function getProject(alias) {
    if (alias) {
        var index = parseInt(data.projectIndex[alias]);
        return data.myProjects[index];
    } else {
        return data.myProjects
    }
}

router.get('/', function (req, res) {
    res.render('admin/dashboard', {
        layout: "layout-dashboard",
        title: 'Admin Dashboard',
        navDashBoard: true,
    })
})


router.get('/projects', function (req, res) {
    function listProjects(err, data) {
        if (!err) {
            res.render('admin/projects', {
                layout: "layout-dashboard",
                title: 'Project Admin',
                navProjects: true,
                projects: data
            })
        } else {
            console.log(err);
            res.send(err);
        }
    };
    projectService.getProjects(listProjects);
})

router.get('/projects/create', function (req, res) {
    res.render('admin/project-create', {
        layout: "layout-dashboard",
        title: 'Project Admin',
        navProjects: true
    })
});

router.post('/projects/create', function (req, res) {
    var inputData = req.body;

    var callback = function (err, data) {
        if (!err) {
            return res.redirect('/admin/projects')
        }
        console.log(err);
    }
    projectService.create(inputData, callback)

})


router.get('/media', (req, res) => {
    res.render('admin/upload', {
        title: 'Image Upload',
        layout: 'layout-dashboard',
        navProjects: true
    })
})

router.post('/media', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            return res.end('Error uploading')
        }
        res.end('File uploaded successfully')
    });
});

router.get('/project/:projectAlias', (req, res) => {
    var alias = req.params.projectAlias;

    function getProject(err, data) {
        if (!err) {
            res.render('admin/project-detail', {
                title: 'Project Detail',
                layout: 'layout-dashboard',
                navProjects: true,
                project: data
            })
        } else {
            console.log(err);
            res.send(err)
        }
    }
   projectService.getProjectByAlias(alias, getProject)
})

router.post('/project/:projectAlias/update', (req, res) => {
    let alias = req.params.projectAlias;
    let data = req.body;
    let updatePro = function (err, data) {
        if (!err) {
            res.redirect('/admin/project/' +alias)
        } else {
            console.log(err);
        }
    }

    projectService.updateProject(alias, data, updatePro);
})

router.get('/project/:projectAlias/delete', (req, res) => {
    let alias = req.params.projectAlias;
    function deleteProject(err, data) {
        if (!err) {
            res.redirect('/admin/projects')
        } else {
            console.log(err);
            res.send(err)
        }
    }

    projectService.deleteProject(alias, deleteProject)

})

router.get('/project/:projectAlias/uploaddemo', (req, res) => {
    var alias = req.params.projectAlias;
    res.render('admin/upload', {
        title: 'Image Upload',
        layout: 'layout-dashboard',
        navProjects: true,
        actionUrl: '/admin/project/' + alias + '/uploaddemo'
    })
})

router.post('/project/:projectAlias/uploaddemo', (req, res) => {
    var pAlias = req.params.projectAlias;
    var dir = path.join(__dirname, '../static/project-demos/' + pAlias)

    var finishUpload = function (err, data) {
        if (err) {
            console.log(err)
        } else {
            // unzip the contents to the same folder
            var zipfile = dir + '/' + pAlias + '.zip';

            fs.createReadStream(zipfile).pipe(unzip.Extract({ path: dir }));
            fs.unlinkSync(zipfile);
            res.send('Done');
        }
    }
    mediaService.uploadMedia(req, res, dir, pAlias + '.zip', finishUpload)
});

router.get('/project/:projectAlias/upload-image', (req, res) => {
    var alias = req.params.projectAlias;
    res.render('admin/upload', {
        title: 'Image Upload',
        layout: 'layout-dashboard',
        navProjects: true,
        actionUrl: '/admin/project/' + alias + '/upload-image'
    })
})


router.post('/project/:projectAlias/upload-image', (req, res) => {
    var alias = req.params.projectAlias;
    
    let dir = path.join(__dirname, '../static/projects/' +alias+ '/images');

    let finishUpload = function (err, data) {
        if(err) {
            console.log(err)
        }else {
            res.redirect('/admin/project/' +alias);
        }
    }

    var callback = function(error,data) {
        if(error) {
            console.log(error)
        }else {
            projectService.updateProject(alias, {image: '/projects/'+alias+'/images/'+alias+'.png'}, finishUpload)
        }
    }

    mediaService.uploadMedia(req,res, dir, alias+'.png', callback)

})





module.exports = router;