const db = require('../db/db.js')
module.exports = async function(req,res){
    res.send(await db.each("SELECT * FROM chat"))
}