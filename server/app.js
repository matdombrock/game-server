// server.js
const init = require('./init')
const publicIp = require('public-ip');
const express = require('express');
const session = require('express-session')

const controllers = {}
controllers.register = require('./controllers/register')
controllers.login = require('./controllers/login')
controllers.whoami = require('./controllers/whoami')
controllers.status = require('./controllers/status')

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
app.get('/whoami', function(req, res){
  controllers.whoami(req,res)
})

app.listen(PORT, () => {
  (async () => {
    const public_ip = await publicIp.v4()
    console.log('Server is running at:\r\n'+public_ip+":"+PORT);
  })();
});