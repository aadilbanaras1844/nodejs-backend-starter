

const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    
    encryptPassword: function(password) {
        return new Promise(function(resolve, reject){
            bcrypt.hash(password, saltRounds, function(err, hash) {
                if(err)
                    return reject(err)
                return resolve(hash);
            });
        })
        
    },
    comparePassword: function(password, hash){
        return new Promise(function(resolve, reject){
            bcrypt.compare(password, hash, function(err, res) {
                if(err)
                    return reject(err)
                return resolve(res)
            });
        })       
    },
    ApiResponse: function(res, statusCode, status, msg, data){
        return res.status( statusCode ).json({status: status, message: msg, data: data})
    },

}