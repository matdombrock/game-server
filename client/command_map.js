const server = require('./commands/server')
const register = require('./commands/register')
const login = require('./commands/login')
const whoami = require('./commands/whoami')

module.exports = {
    server: {
        description: "setup the server",
        example: ["server"],
        command: async(input,state) => {await server(input,state)}
    },
    register: {
        description: "",
        example: [""],
        command: async(input,state) => {await register(input,state)}
    },
    login: {
        description: "",
        example: [""],
        command: async(input,state) => {await login(input,state)}
    },
    whoami: {
        description: "",
        example: [""],
        command: async(input,state) => {await whoami(input,state)}
    }
}