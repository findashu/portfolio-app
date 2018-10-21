const Project = require('../modal/projectModal');

module.exports.getProjects = (callback) => {
    Project.find().then(projects => {
        callback(null, projects)
    }).catch(err => {
        console.log(err);
        callback(err, null)
    })
}

module.exports.getProjectByAlias = (alias, callback) => {
    Project.findOne({'alias' : alias}).then(project => {
        callback(null, project)
    }).catch(err => callback(err, null))
}


module.exports.create = function(project, callback) {

    let alias = project.name.toLowerCase().split(' ').join('-')

    let newProject = new Project();
    newProject.name = project.name;
    newProject.alias = alias;
    newProject.githubUrl = project.githubUrl;
    newProject.image = project.image;
    newProject.description = project.description;
    newProject.tags = [];

    var tags = project.tags.trim();
    tags = tags.split(',');
    for(var i = 0; i<tags.length; i++) {
        newProject.tags.push({'name':tags[i], 'class':'info'});
    }
    newProject.createdAt = Date.now();

    newProject.save().then(project => {
        callback(null, project)
    }).catch(err => {
        callback(err, null)
    })
}

module.exports.deleteProject = function(alias, callback) {
    console.log(alias)
    Project.deleteOne({'alias': alias}).then(data => {
        callback(null, data)
    }).catch(err => {
        console.log(err);
        
        callback(err, null)
    })
}

module.exports.updateProject = function (alias,data, callback) {
    Project.findOne({'alias':alias}).then(project => {
        if(!project) {
           return callback('Project not found', null)
        }
        if(data.name) {
            project.name = data.name
        }
        if(data.description){
            project.description = data.description
        }
        if(data.githubUrl){
            project.githubUrl = data.githubUrl
        }
        if(data.image) {
            project.image = data.image
        }
        
        project.save().then(updatedProject => {
            callback(null, updatedProject)
        }).catch(err => callback(err, null))
    })
}
 