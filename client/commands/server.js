const prompt = require('../utility/prompt')
const argsToLower = require('../utility/args-to-lower')
const rp = require('request-promise')
const requestError = require('../utility/request-error')
const out = require('../utility/output')

module.exports = async function server(input,state){
    input = argsToLower(input) 
    if(input[1] === undefined){
        if(state.server.address != ""){
            out(state.server.address,'info')
        }else{
            out("Server Not Configured!",'msg')
            out("Configure With:")
            out("'server setup'")
        }
        return
    }
    let arg_found = false
    if(input[1] === "setup"){
        arg_found = true
        out("Setting Up The Server")
        const server_addr = prompt("server address:")
        out(server_addr,'info')
        const correct = prompt("correct? (yes/no):")
        if(correct.toLowerCase()[0]!=="y"){
            const retry = prompt("Re-enter address? (yes/no)")
            if(retry.toLowerCase()[0]==="y"){
                server(input)
                return
            }
            else{
                out("Exiting Server Configuration")
                return
            }
        }
        out("Server Has Been Configured")
        state.server.address = server_addr
        return
    }
    if(input[1] === "status"){
        arg_found = true
        let req_options = {
            method: 'GET',
            uri: "http://"+state.server.address+"/status",
            resolveWithFullResponse: true 
        }
        await rp(req_options)
        .then(function(response){
            out(response.body)
            out('statusCode: '+ response && response.statusCode);
        })
        .catch(function(err){requestError(err)})
        return
    }
    if(!arg_found){
        out("Cannot Find Argument: "+input[1] + "for command "+input[0],'warn')
    }
}