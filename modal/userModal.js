const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: String,
    email: {type :String},
    password: String,
    mobile : Number,
    createdOn : Date,
    updatedOn : Date,
});

module.exports = mongoose.model('users', userSchema); // this returns the whole collection