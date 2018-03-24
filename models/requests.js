const Model = require('./model.js')(`requests`)
const usersModel = require('./users.js')
const apiController = require('../coapi/apicontroller.js')


class requestsModel extends Model{
    constructor() {
        super()
    }

    static update(id, body) {
       return super.one(id)
            .then(currentReq => {
                if (currentReq.status === 'pending' && body.status && body.status === 'accepted') {
                    let refs = [usersModel.one(currentReq.parent_id), usersModel.one(currentReq.child_id)]
                    return Promise.all(refs)
                        .then(refs => {
                            let [parent, child] = refs
                            let parentRef = parent.bank_account
                            let childRef = child.bank_account
                            return super.update(id, body)
                                .then(updatedReq => {
                                    return apiController.scheduleTransfer(parentRef, childRef, updatedReq.amount, updatedReq.memo)
                                        .then(transfer => {
                                            return updatedReq
                                        })
                                })
                        })
                } else {
                    return super.update(id, body)
                        .then(updatedReq => {
                            return updatedReq
                        })
                }
            })
    }

    static allMatchingWhere(key, value) {
        return super.allMatchingFrom('requests', key, value)
            .then(allReqs => {
                return allReqs.filter(request => request.status === 'pending')
            })
    }
}

module.exports = requestsModel