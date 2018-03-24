const Model = require('./model.js')(`allowances`)

class allowancesModel extends Model{
    constructor() {
        super()
    }

    static allMatchingWhere(key, value) {
        return super.allMatchingFrom('allowances', key, value)
    }
}

module.exports = allowancesModel