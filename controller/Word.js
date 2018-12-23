const wordSchema = require('../schema/Word');
const mongoose = require('mongoose');
const word = mongoose.model('Word', wordSchema);

function respond(err, result, res){
    if(err){
        return res.status(500).json({error: err});
    }
    return res.json(result);
}

const wordController = {
    getAll: function(req, res) {
        word.find({}, function (err, words){
            return respond(err, words, res);
        });
    },
    create: function(req, res){
        const newWord = new word(req.body);
        newWord.save(function (err, savedWord){
            return respond(err, savedWord, res);
        });
    },
    get : function(req, res){
        word.findById(req.params.id, function (err, word){
            return respond(err, word, res);
        });
    },
    update: function(req, res){
        word.findByIdAndUpdate(req.params.id, req.body, function (err, word){
            return respond(err, word, res);
        });
    },
    remove: function(req, res){
        word.findByIdAndRemove(req.params.id, function (err, word){
            return respond(err, word, res);
        });
    }
    /*addTranslation: function(wordId ,translationId){
        word.findById(wordId, function(err, wordFound){
            wordFound.translations.push(translationId);
            word.save(wordFound);
        });
    },
    removeTranslation: function(wordId ,translationId){
        word.findById(wordId, function(err, wordFound){
            const index = wordFound.translations.indexOf(translationId);
            if(index > -1){
                wordFound.splice(translation, 1);
            }
            word.save(wordFound);
        });
    },*/


};

module.exports = wordController;