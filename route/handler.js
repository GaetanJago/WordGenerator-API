let jwt = require('jsonwebtoken');
let config = require('../config');
const accountController = require('../controller/Account');
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
                if (username === account.username && password === account.password) {
                    let token = jwt.sign({ username: username },
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