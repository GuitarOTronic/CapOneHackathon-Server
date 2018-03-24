const Model = require('./model.js')(`goals`)

class goalsModel extends Model{
    constructor () {
        super()
    }
    
    static allMatchingWhere(key, value) {
        return super.allMatchingFrom('goals', key, value)
    }
}

module.exports = goalsModel