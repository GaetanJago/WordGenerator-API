const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    username: {type: String, unique:true, required: true},
    password: {type: String, unique:true, required: true},
    mail: {type: String, unique:true, required: false},
    displayName: {type: String, unique:false, required: true}
},
    {timestamps: true}
    );

module.exports = accountSchema;