let jwt = require('jsonwebtoken');
let config = require('../config');
const accountController = require('../controller/Account');
const roleController = require('../controller/Role');
const bcrypt = require('bcrypt');
//let Cookies = require('cookies');


class HandlerGenerator {
    login(req, res) {
        let username = req.body.username;
        let password = req.body.password;
        // For the given username fetch user from DB
        accountController.getByUsername(username).then((account) => {
            if (!account) {
                res.statusMessage = "Incorrect username";
                res.status(403).end();
            }
            if (account && username && password) {
                if (username === account.username) {
                    bcrypt.compare(password, account.password, function (err, resultPassword) {
                        if (resultPassword === true) {
                            roleController.getById(account.role).then((userRole) => {
                                let token = jwt.sign({ username: username, role: userRole.libelle },
                                    config.secret,
                                    {
                                        expiresIn: '24h' // expires in 24 hours
                                    }
                                );
                                res.cookie('access-token', token, { httpOnly: true });
                                // return the JWT token for the future API calls
                                res.json({
                                    success: true,
                                    message: 'Authentication successful!',
                                    token: token
                                });
                            });
                        }
                    });

                } else {
                    res.statusMessage = "Incorrect password";
                    res.status(403).end();
                }
            }
        });
    }
    index(req, res) {
        res.json({
            success: true,
            message: 'Index page'
        });
    }
}

module.exports = HandlerGenerator;