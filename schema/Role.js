const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    libelle: {type: String, unique:true, required: true},
    power: {type: Number, unique:true, required: true}
},
    {timestamps: true}
    );

module.exports = roleSchema;