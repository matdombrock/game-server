const rp = require('request-promise')
const requestError = require('../utility/request-error')
const out = require('../utility/output')

module.exports = async function login(input,state){
    let req_options = {
        method: 'GET',
        uri: "http://"+state.server.address+"/login?name="+input[1],
        resolveWithFullResponse: true 
    }
    await rp(req_options)
    .then(function(response){
        out(response.body,'info')
        state.cookieJar.setCookie(response.headers['set-cookie'][0], "http://"+state.server.address)
    })
    .catch(function(err){requestError(err)})
}