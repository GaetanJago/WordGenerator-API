let jwt = require('jsonwebtoken');
const config = require('./config.js');

let checkToken = (req, res, next) => {
  //console.log(req);
  //let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  let token = req.headers.cookie;
  if (token.startsWith('access-token=')) {
    // Remove Bearer from string
    token = token.slice(13, token.length);
    console.log(token);
  }

  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        //res.sendFile('/home/gaetan/Documents/WordGenerator/GUI/views/admin/language.html');
        //next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = {
  checkToken: checkToken
}