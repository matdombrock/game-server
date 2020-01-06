const db = require('./db/db')
const crypt = require('../utility/crypt')
const isLoggedIn = require('../utility/is-logged-in')

module.exports = async function(req,res){
    if(isLoggedIn(req,res,true)){return}
    const password = crypt.encrypt(req.query.password)
    const registered = await db.run("INSERT INTO users(name,password) VALUES('"+req.query.name+"','"+password+"')")
    console.log("REGISTERED: ",registered)
    if(registered){
        res.send("Registered")
        return
    }
    res.send("Could Not Register. It's possible that name is already taken.")
}
