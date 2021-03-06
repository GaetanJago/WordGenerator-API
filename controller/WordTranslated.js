const wordTranslatedSchema = require('../schema/WordTranslated');
const mongoose = require('mongoose');
const wordTranslated = mongoose.model('WordTranslated', wordTranslatedSchema);
const wordController = require('../controller/Word');

function respond(err, result, res){
    if(err){
        return res.status(500).json({error: err});
    }
    return res.json(result);
}

const wordTranslatedController = {
    getAll: function(req, res) {
        wordTranslated.find({}, function (err, wordsTranslated){
            return respond(err, wordsTranslated, res);
        });
    },
    create: function(req, res){
        const newWordTranslated = new wordTranslated(req.body);
        newWordTranslated.save(function (err, savedWordTranslated){
            //wordController.addTranslation(req.param.wordRef, req.param.id);
            return respond(err, savedWordTranslated, res);
        });
    },
    get : function(req, res){
        wordTranslated.findById(req.params.id, function (err, wordTranslated){
            return respond(err, wordTranslated, res);
        });
    },
    update: function(req, res){
        wordTranslated.findByIdAndUpdate(req.params.id, req.body, function (err, wordTranslated){
            return respond(err, wordTranslated, res);
        });
    },
    remove: function(req, res){
        wordTranslated.findByIdAndRemove(req.params.id, function (err, wordTranslated){
            //wordController.removeTranslation(req.param.wordRef, req.param.id);
            return respond(err, wordTranslated, res);
        });
    },
    findByWordRef: function(req, res){
        console.log(req.query.name);
        console.log(req.query.je);
        res.json({'hello': 'hello'})
    }
};

module.exports = wordTranslatedController;