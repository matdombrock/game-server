const out = require('../utility/output')
const promptSync = require('prompt-sync')({
    sigint: true,
    history: require('prompt-sync-history')() //open history file
});
module.exports = function prompt(question=null){
    if(question){
        out(question,'question')
    }
    return promptSync("⚶ ")
}