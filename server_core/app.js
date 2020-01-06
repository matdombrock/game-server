// server.js
const init = require('./init')
const publicIp = require('public-ip');
const express = require('express');
const session = require('express-session')

/* //user/app
const user = {}
user.routes = require("./app/routes") */

const controllers = {}
controllers.register = require('./controllers/register')
controllers.login = require('./controllers/login')
controllers.logout = require('./controllers/logout')
controllers.whoami = require('./controllers/whoami')
controllers.status = require('./controllers/status')
controllers.chat  = {}
controllers.chat.read = require("./controllers/chat/read")
controllers.chat.say = require("./controllers/chat/say")

init.init()

const app = express();
const PORT = process.env.PORT = 1337;

app.use("/public", express.static(__dirname + '/public'));
app.use(session({
  'secret': '343ji43j4n3jn4jk3n'
}))

//routes
app.get('/', function(req, res){
    res.send('Hello Worlds!')
})
app.get('/status', function(req, res){
  controllers.status(req,res)
})
app.post('/register', function(req, res){
  controllers.register(req,res)
})
app.post('/login', function(req, res){
  controllers.login(req,res)
})
app.get('/logout', function(req, res){
  controllers.logout(req,res)
})
app.get('/whoami', function(req, res){
  controllers.whoami(req,res)
})
app.get('/chat/read', function(req, res){
  controllers.chat.read(req,res)
})
app.post('/chat/say', function(req, res){
  controllers.chat.say(req,res)
})



app.listen(PORT, () => {
  (async () => {
    const public_ip = await publicIp.v4()
    console.log('Server is running at:\r\n'+public_ip+":"+PORT);
  })();
});

exports.app = app