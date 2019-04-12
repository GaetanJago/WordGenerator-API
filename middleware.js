let jwt = require('jsonwebtoken');
const config = require('./config.js');
const accountController = require('./controller/Account');
const roleController = require('./controller/Role');

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
        console.log(decoded);
        checkPermission(decoded.username, roleMinimum).then((result) => {
          if(!result){
            console.log('not enough permission');
            res.json({
              success: false,
              message: 'Not enough permission'
            });
            reject();
          }
          resolve(true);
        });
          

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

const checkPermission= (username, roleMinimumLibelle) => {
  return new Promise((resolve, reject) => {
    accountController.getByUsername(username).then((account) => {
      roleController.getById(account.role).then((userRole) => {
        roleController.getByLibelle(roleMinimumLibelle).then((roleMinimum) => {
          console.log('power');
          console.log(roleMinimum.power);
          console.log(userRole.power);
          if(roleMinimum.power <= userRole.power){
            resolve(true);
          }
          resolve(false);
        });
      });
    });
});
  
  
}

module.exports = {
  checkToken: checkToken
}