const rp = require('request-promise')
const requestError = require('../utility/request-error')
const out = require('../utility/output')


module.exports = async function(input,state){
    const password = input[2]
    let req_options = {
        method: 'POST',
        uri: "http://"+state.server.address+"/register?name="+input[1]+"&password="+password,
        jar: state.cookieJar,
        resolveWithFullResponse: true 
    }
    await rp(req_options)
    .then(function(response){
        out(response.body,'info')
        if(response.headers['set-cookie'] && response.headers['set-cookie'][0]){
            state.cookieJar.setCookie(response.headers['set-cookie'][0], "http://"+state.server.address)
        }
    })
    .catch(function(err){requestError(err)})
}