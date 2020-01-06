/*
Takes pararms:
format = html
type = <output[type]>
*/

const db = require('./db/db.js')

module.exports = async function(req,res){
    let output = {}
    output.status = 'Server Is Up :)'
    const sessions_list = await new Promise(function(resolve,reject){
        req.sessionStore.all(function(err, sessions) {
            resolve(sessions)
        });
    })
    output.sessions = {}
    output.sessions.count = Object.keys(sessions_list).length
    output.sessions.users = []
    for(session in sessions_list){
        output.sessions.users.push(sessions_list[session].name)
    }

    output.logged_in = {}
    output.logged_in.count = 0
    output.logged_in.users = []
    for(session in sessions_list){
        console.log("checking real",sessions_list[session].name)
        if(sessions_list[session].name !== null && sessions_list[session].name !== undefined && sessions_list[session].name !== 'null'){
            output.logged_in.count++
            output.logged_in.users.push(sessions_list[session].name)
        }
    }

    output.registered = {}
    output.registered.count = 0
    output.registered.users = []
    const users = await db.each("SELECT * FROM users")
    for (user in users){
        output.registered.users.push(users[user].name)
    }
    output.registered.count = output.registered.users.length

    if(req.query.type){
        output = output[req.query.type]
    }

    if(req.query.format && req.query.format.toLowerCase() === "html"){
        res.send("<pre>"+JSON.stringify(output, undefined, 2)+"</pre>")
    }else{
        res.send(output)
    }
    
}