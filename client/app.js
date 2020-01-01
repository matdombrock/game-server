const rp = require('request-promise')
const prompt = require('./utility/prompt')
const command_map = require('./command_map')
const out = require('./utility/output')


let state = {
    server: {
        address: "67.185.150.32:1337"
    },
    cookieJar: rp.jar()
}

async function main(){
    let input = prompt()
    if(input === ""){
        console.log("No Input...")
        main()
        return
    }
    input = input.split(" ")
    input[0] = input[0].toLowerCase()

    let command_found = false
    for(command in command_map){
        if(input[0] === command){
            //found command
            command_found = true
            await command_map[command].command(input,state)
        }
    }
    if(!command_found){
        out("Unknown Command: "+input[0],'warn')
    }
    main()
    return
}
main()