const term = require( 'terminal-kit' ).terminal
module.exports = function(string="foo", type='none', new_line = true){
    if(new_line){
        string += "\r\n"
    }
    switch(type){
        case "msg":
            term(string)
            break
        case "info":
            term.green(string)
            break
        case "warn":
            term.yellow.bold(string)
            break
        case "error":
            term.red.bold(string)
            break
        case "question":
            term.brightBlue(string)
            break
        default:
            term.bold(string)
            break
    }
}