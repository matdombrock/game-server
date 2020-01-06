module.exports = function argsToLower(input){
    if(typeof input !== 'object'){
        return false
    }
    return input.join(' ').toLowerCase().split(' ')
}