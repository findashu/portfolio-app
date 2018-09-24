var express = require('express')
const router = express.Router();
const data = require('../seed-data');

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

module.exports = router;