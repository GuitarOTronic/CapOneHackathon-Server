const Model = require('./model.js')(`requests`)

class requestsModel extends Model{
    constructor() {
        super()
    }

    static allMatchingWhere(key, value) {
        return super.allMatchingFrom('requests', key, value)
    }
}

module.exports = requestsModel