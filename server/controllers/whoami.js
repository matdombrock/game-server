const isLoggedIn = require('../utility/is-logged-in')
module.exports = function(req,res){
    if(!isLoggedIn(req,res)){return}
    res.send(req.session.name)
}
