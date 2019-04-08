const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CategorySchema = require('./Category.js')

const wordSchema = new Schema({
        label: {type: String, required: true},
        categories : [CategorySchema]
        //translations: [{type: Schema.Types.ObjectId, ref: 'WordTranslated', required: false}]
    },
    {timestamps: true}
);

module.exports = wordSchema;