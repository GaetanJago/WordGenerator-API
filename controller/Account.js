const accountSchema = require('../schema/Account');
const mongoose = require('mongoose');
const account = mongoose.model('Account', accountSchema);
const roleSchema = require('../schema/Role');
const role = mongoose.model('Role', roleSchema);

function respond(err, result, res) {
    if (err) {
        return res.status(500).json({ error: err });
    }
    return res.json(result);
}

const accountController = {
    getAll: function (req, res) {
        account.find({}, function (err, accounts) {
            return respond(err, accounts, res);
        });
    },
    create: function (req, res) {
        role.findOne({libelle: req.body.role}, function (err, roleFound) {
            //console.log(roleFound.accounts);
            //console.log(newAccount);
            req.body.role = roleFound._id;
            const newAccount = new account(req.body);
            
            roleFound.accounts.push(newAccount);
            roleFound.save(function (err, savedAccount) {
                newAccount.save(function (err, savedAccount) {
                    return respond(err, savedAccount, res);
                });
            });
        });

    },
    get: function (req, res) {
        account.findById(req.params.id, function (err, account) {
            return respond(err, account, res);
        });
    },
    update: function (req, res) {
        account.findByIdAndUpdate(req.params.id, req.body, function (err, account) {
            return respond(err, account, res);
        });
    },
    remove: function (req, res) {
        account.findByIdAndRemove(req.params.id, function (err, account) {
            return respond(err, account, res);
        });
    },
    getByUsername: function (username) {
        return new Promise((resolve, reject) => {
            account.findOne({ username: username }, 'username password role', function (err, account) {
                if (err) reject(handleError(err));
                resolve(account);
            }); 
        })
        
    }
};

module.exports = accountController;