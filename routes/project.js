const express = require('express');
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


router.get('/', (req, res) => {
    res.render('projects', {
        title: 'Projects',
        layout: 'layout',
        nav: true,
        navProjects: true,
        footer: true,
        projects: data.myProjects
    })
})

router.get('/:alias', (req, res) => {
    let uName = req.params.alias;
    var project = getProject(uName)
    res.render('project-detail', {
        title: 'Project Detail',
        layout: 'layout',
        nav: true,
        footer: true,
        project: project
    })
})

module.exports = router;
