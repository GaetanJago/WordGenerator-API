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
    }
};

module.exports = roleController;