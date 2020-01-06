module.exports = function isLoggedIn(req,res,check_for=false){
    if(req.session.name !== "" && req.session.name !== undefined){
        console.log("Already Logged In")
        if(check_for===true){
            res.send("You Are Already Logged In!")
        }
        return true
    }else{
        console.log("NOT LOGGED IN")
        if(check_for===false){
            res.send("You Must Be Logged In To Do That!")
        }
        return false
    }
}