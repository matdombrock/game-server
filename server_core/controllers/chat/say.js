const db = require('../db/db.js')
module.exports = async function(req,res){
    await db.run("INSERT INTO chat(name,message) VALUES('"+req.session.name+"','"+req.query.message+"')")
    res.send("Message Sent.")
}