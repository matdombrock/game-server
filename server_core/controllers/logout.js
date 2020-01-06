const isLoggedIn = require('../utility/is-logged-in')

module.exports = function(req,res){
    if(!isLoggedIn(req,res)){return}
    console.log(req.session.name,"logged out")
    req.session.destroy()
    res.send("Logged Out!")
}