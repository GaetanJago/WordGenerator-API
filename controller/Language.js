const languageSchema = require('../schema/Language');
const mongoose = require('mongoose');
const language = mongoose.model('Language', languageSchema);

function respond(err, result, res){
    if(err){
        return res.status(500).json({error: err});
    }
    return res.json(result);
}

const languageController = {
    getAll: function(req, res) {
        language.find({}, function (err, languages){
            return respond(err, languages, res);
        });
    },
    create: function(req, res){
        const newLanguage = new language(req.body);
        newLanguage.save(function (err, savedLanguage){
            return respond(err, savedLanguage, res);
        });
    },
    get : function(req, res){
        language.findById(req.params.id, function (err, language){
            return respond(err, language, res);
        });
    },
    update: function(req, res){
        language.findByIdAndUpdate(req.params.id, req.body, function (err, language){
            return respond(err, language, res);
        });
    },
    remove: function(req, res){
        language.findByIdAndRemove(req.params.id, function (err, language){
            return respond(err, language, res);
        });
    }
};

module.exports = languageController;