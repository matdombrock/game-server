const bcrypt = require('bcrypt');
exports.encrypt = function(password){
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}
exports.compare = function(password, hash){
    return bcrypt.compareSync(password, hash)
}