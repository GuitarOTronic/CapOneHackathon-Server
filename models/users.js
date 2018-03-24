const Model = require('./model.js')(`users`)

class usersModel extends Model{
    constructor() {
        super()
    }

    static allMatchingWhere(key, value) {
        return super.allMatchingFrom('users', key, value)
    }
}

module.exports = usersModel