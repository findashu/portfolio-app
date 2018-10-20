const express = require('express');
const router = express.Router();
const projectService = require('../services/projectService');




function getProject(alias) {
    if (alias) {
        var index = parseInt(data.projectIndex[alias]);
        return data.myProjects[index];
    } else {
        return data.myProjects
    }
}


router.get('/', (req, res) => {
    function listProjects(err,data) {
        if(!err){
            res.render('projects', {
                title: 'Projects',
                layout: 'layout',
                nav: true,
                navProjects: true,
                footer: true,
                projects: data
            })
        }else {
            res.send('Something went wrong')
        } 
    }

    projectService.getProjects(listProjects)
})

router.get('/:alias', (req, res) => {
    let uName = req.params.alias;
    function projectDetail(err ,data) {
        if(!err){
            res.render('project-detail', {
                title: 'Project Detail',
                layout: 'layout',
                nav: true,
                footer: true,
                project: data
            })
        }else {
            console.log(err)
            res.send('Something went wrong')
        }
    }
    projectService.getProjectByAlias(uName, projectDetail)
})

module.exports = router;
