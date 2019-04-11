const accountSchema = require('../schema/Account');
const mongoose = require('mongoose');
const account = mongoose.model('Account', accountSchema);

function respond(err, result, res){
    if(err){
        return res.status(500).json({error: err});
    }
    return res.json(result);
}

const accountController = {
    getAll: function(req, res) {
        account.find({}, function (err, accounts){
            return respond(err, accounts, res);
        });
    },
    create: function(req, res){
        const newAccount = new account(req.body);
        newAccount.save(function (err, savedAccount){
            return respond(err, savedAccount, res);
        });
    },
    get : function(req, res){
        account.findById(req.params.id, function (err, account){
            return respond(err, account, res);
        });
    },
    update: function(req, res){
        account.findByIdAndUpdate(req.params.id, req.body, function (err, account){
            return respond(err, account, res);
        });
    },
    remove: function(req, res){
        account.findByIdAndRemove(req.params.id, function (err, account){
            return respond(err, account, res);
        });
    }
};

module.exports = accountController;