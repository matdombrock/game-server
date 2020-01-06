const rp = require('request-promise')
const requestError = require('../utility/request-error')
const out = require('../utility/output')

module.exports = async function whoami(input,state){
    let req_options = {
        method: 'GET',
        uri: "http://"+state.server.address+"/whoami",
        jar: state.cookieJar,
        resolveWithFullResponse: true 
    }
    await rp(req_options)
    .then(function(response){
        out(response.body,'info')
    })
    .catch(function(err){requestError(err)})
}