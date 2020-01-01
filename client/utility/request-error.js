const out = require('./output')
module.exports = function requestError(err){
    out("There has been some kind of error with your request.",'warn')
    out("More Info",'warn')
    out(err,'error')
}