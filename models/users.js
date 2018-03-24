const Model = require('./model.js')(`users`)

class usersModel extends Model{
    constructor() {
        super()
    }

    static one(id) {
        return super.one(id).then(user => {
            delete user.password
            return user
        })
    }

    static allMatchingWhere(key, value) {
        return super.allMatchingFrom('users', key, value)
    }
}

module.exports = usersModel