const roleSchema = require('../schema/Role');
const mongoose = require('mongoose');
const role = mongoose.model('Role', roleSchema);

function respond(err, result, res){
    if(err){
        return res.status(500).json({error: err});
    }
    return res.json(result);
}

const roleController = {
    getAll: function(req, res) {
        role.find({}, function (err, roles){
            return respond(err, roles, res);
        });
    },
    create: function(req, res){
        const newRole = new role(req.body);
        newRole.save(function (err, savedRole){
            return respond(err, savedRole, res);
        });
    },
    get : function(req, res){
        role.findById(req.params.id, function (err, role){
            return respond(err, role, res);
        });
    },
    update: function(req, res){
        role.findByIdAndUpdate(req.params.id, req.body, function (err, role){
            return respond(err, role, res);
        });
    },
    remove: function(req, res){
        role.findByIdAndRemove(req.params.id, function (err, role){
            return respond(err, role, res);
        });
    },
    getById: function(id){
        return new Promise((resolve, reject) => {
            role.findById(id, function (err, roleFound) {
                if (err) reject(handleError(err));
                resolve(roleFound);
            }); 
        });
    },
    getByLibelle: function(libelle){
        return new Promise((resolve, reject) => {
            role.findOne({ libelle: libelle }, function (err, roleFound) {
                if (err) reject(handleError(err));
                resolve(roleFound);
            }); 
        });
        /*role.findOne({ libelle: libelle }).exec(function (err, roleFound) {
            if (err) return handleError(err);
            return roleFound;
        });*/ 
    }
};

module.exports = roleController;