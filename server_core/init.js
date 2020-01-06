const db = require('./controllers/db/db.js')
exports.init = async function(){
    await db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )`)
    await db.run(`CREATE TABLE IF NOT EXISTS chat (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        message TEXT NOT NULL
    )`)
    await db.run('INSERT INTO chat(name,message) VALUES("server","Server BOOT!")')
    //db.run('INSERT INTO users(id,name,password) VALUES(0,"admin","password")')
    const users = await db.each("SELECT * FROM users")
    //console.log(users)
    console.log("USERS LIST:")
    for (user in users){
        console.log(">>",users[user].name)
    }
}