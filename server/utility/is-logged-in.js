module.exports = function isLoggedIn(req,res){
    if(req.session && req.session.name !== "" && req.session.name !== undefined){
        return true
    }else{
        res.send("You Must Be Logged In To Do That!")
        return false
    }
}