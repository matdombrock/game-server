const core = require('../server_core/app')

core.app.get('/y', function(req, res){
    res.send(req.session.name)
})