const mongoose = require('mongoose');

const Schema =  mongoose.Schema;


const projectSchema = new Schema({
    name : String,
    alias : String,
    githubUrl : String,
    description : String,
    image : String,
    tags : [{name: String, class: String}],
    imageSliders : [{type :String}],
    createdAt : {type : Date, default : Date.now()},
    updatedAt : {type : Date, default : Date.now()}
})

module.exports = mongoose.model('projects', projectSchema);