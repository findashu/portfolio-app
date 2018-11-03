const Client = require('node-rest-client').Client;
const client = new Client();

module.exports.getProjects = (callback) => {
    var args = {
        headers: {
            "Content-Type":"application/json",
            "Accepts": "application/json"
        }
    }

    client.get('http://localhost:3003/projects', args, function(data) {
        console.log(data) 
    if(data.data) {
            
            callback(null, data.data)
        }else {
            callback(data.message,null)
        }
    })
}

 module.exports.getProjectByAlias = (alias, callback) => {
    var args = {
        headers: {
            "Content-Type":"application/json",
            "Accepts": "application/json"
        }
    }

    client.get('http://localhost:3003/projects/alias/'+alias, args, function(data) {
        console.log(data) 
    if(data.data) { 
            callback(null, data.data)
        }else {
            callback(data.message,null)
        }
    })
}


module.exports.create = function(project, callback) {

    var args = {
        headers: {
            "Content-Type":"application/json",
            "Accepts": "application/json"
        },
        data:project
    }

    client.post('http://localhost:3003/projects', args, function(data, response) {
        if(data) {
            callback(null, data)
        }else {
            callback(data.message, null)
        }
    })

}

// module.exports.deleteProject = function(alias, callback) {
//     console.log(alias)
//     Project.deleteOne({'alias': alias}).then(data => {
//         callback(null, data)
//     }).catch(err => {
//         console.log(err);
        
//         callback(err, null)
//     })
// }

// module.exports.updateProject = function (alias,data, callback) {
//     Project.findOne({'alias':alias}).then(project => {
//         if(!project) {
//            return callback('Project not found', null)
//         }
//         if(data.name) {
//             project.name = data.name
//         }
//         if(data.description){
//             project.description = data.description
//         }
//         if(data.githubUrl){
//             project.githubUrl = data.githubUrl
//         }
//         if(data.image) {
//             project.image = data.image
//         }
        
//         project.save().then(updatedProject => {
//             callback(null, updatedProject)
//         }).catch(err => callback(err, null))
//     })
// }
 