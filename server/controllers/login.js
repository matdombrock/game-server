const db = require('./db/db.js')
const crypt = require('../utility/crypt')
const isLoggedIn = require('../utility/is-logged-in')

async function setLoginSession(req,res,userId){

    const sessions_list = await new Promise(function(resolve,reject){
        req.sessionStore.all(function(err, sessions) {
            resolve(sessions)
        });
    })
    for(session in sessions_list){
        if(sessions_list[session].name === req.query.name){
            
            //req.sessionStore[session].destroy()
            req.sessionStore.destroy(session, function(err,dat){
                console.log("Destroying Existing Session:",session)
            })
        }
    }
    console.log("login success", req.query.name)    
    req.session.name = req.query.name
    req.session.userid = userId
    res.send('OK')
}

module.exports = async function(req,res){
    if(isLoggedIn(req,res,true)){return}
    console.log("login attempt", req.query.name, req.query.password)
    if(req.query.name && req.query.name !== "" && req.query.name !== 'undefined'){//queries are always a string so "undefined" not undefined
        const users = await db.each("SELECT * FROM users")
        for(user in users){
            if(users[user].name === req.query.name){
                if(crypt.compare(req.query.password, users[user].password)){
                    setLoginSession(req,res,users[user].id)
                    return
                }
            }
        }
    }
    else{
        console.log("login fail", req.query.name)  
        res.send('No Name')
        return
    }
    console.log("login fail", req.query.name)
    res.send('BAD LOGIN')
}
