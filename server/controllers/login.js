module.exports = function(req,res){
    console.log("login attempt", req.query.name)
    if(req.query.name && req.query.name !== "" && req.query.name !== 'undefined'){//queries are always a string so "undefined" not undefined
        console.log("login success", req.query.name)    
        req.session.name = req.query.name
        res.send('OK')
    }
    else{
        console.log("login fail", req.query.name)  
        res.send('No Name')
    }
}
