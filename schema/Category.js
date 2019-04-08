const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const WordSchema = require('./Word.js');

const categorySchema = new Schema({
        name: {type: String, required: true},
        words: [ WordSchema ]
    },
    {timestamps: true}
);

module.exports = categorySchema;