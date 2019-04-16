let jwt = require('jsonwebtoken');
const config = require('./config.js');
const accountController = require('./controller/Account');
const roleController = require('./controller/Role');

const rolePowerOrder = ['member', 'moderator', 'admin'];

let checkToken = (req, res, next, roleMinimum) => {
  return new Promise((resolve, reject) => {
    let token = req.headers.cookie;
    if (token && token.startsWith('access-token=')) {
      // Remove Bearer from string
      token = token.slice(13, token.length);
      console.log(token);
    }

    if (token) {
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          res.json({
            success: false,
            message: 'Token is not valid'
          });
          reject();
        } else {
          req.decoded = decoded;
          console.log('decoded');
          console.log(decoded);
          
          if (!checkPermission(decoded.role, roleMinimum)) {
              res.json({
                success: false,
                message: 'Not enough permission'
              });
              reject();
            }
            resolve(true);
          


          //res.sendFile('/home/gaetan/Documents/WordGenerator/GUI/views/admin/language.html');
          //next();
        }
      });
    } else {
      res.json({
        success: false,
        message: 'Auth token is not supplied'
      });
      reject();
    }
  });
  //console.log(req);
  //let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

};

const checkPermission = (userRole, roleMinimumLibelle) => {
  return (rolePowerOrder.indexOf(userRole) >= rolePowerOrder.indexOf(roleMinimumLibelle));
  /*return new Promise((resolve, reject) => {
    roleController.getByLibelle(roleMinimumLibelle).then((roleMinimum) => {;
      if (roleMinimum.power <= userPower) {
        resolve(true);
      }
      resolve(false);
    });
  });*/


}

module.exports = {
  checkToken: checkToken
}