module.exports = function isLoggedIn(req,res,check_for=false){
    if(req.session.name !== "" && req.session.name !== undefined){
        if(check_for===true){
            res.send("You Are Already Logged In!")
        }
        return true
    }else{
        if(check_for===false){
            res.send("You Must Be Logged In To Do That!")
        }
        return false
    }
}