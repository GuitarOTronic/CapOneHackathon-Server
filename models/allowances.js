const Model = require('./model.js')(`allowances`)
const schedule = require('node-schedule')
const apiController = require('../coapi/apicontroller.js')
const usersModel = require('./users.js')

class allowancesModel extends Model{
    constructor() {
        super()

        this.transferJobs = {}
    }

    static create(body) {
        //schedule transfer job
        return super.create(body).then(transfer => {
            let refs = [usersModel.one(transfer.parent_id), usersModel.one(transfer.child_id)]
            return Promise.all(refs)
            .then(refs => {
                let [parentRef, childRef] = refs

                let id = transfer.id
                let rule = new schedule.RecurrenceRule()
                rule.hour(0)
                rule.minute(0)
                rule.dayOfWeek(transfer.weekday - 1)

                transferJobs[id] = schedule.scheduleJob(rule, apiController.scheduleTransfer(parentRef, childRef, transfer.amount))
                return transfer
            })
        })
    }

    static update(id, body) {
        return super.update(id, body).then(transfer => {
            let refs = [usersModel.one(transfer.parent_id), usersModel.one(transfer.child_id)]
            return Promise.all(refs)
                .then(refs => {
                    let [parentRef, childRef] = refs

                    let id = transfer.id
                    let rule = new schedule.RecurrenceRule()
                    rule.hour(0)
                    rule.minute(0)
                    rule.dayOfWeek(transfer.weekday - 1)

                    transferJobs[id].reschedule(rule, apiController.scheduleTransfer(parentRef, childRef, transfer.amount))
                    return transfer
                })
        })
    }

    static destroy(id) {
            this.transferJobs[id].cancel()
        return super.destroy(id)
    }

    static allMatchingWhere(key, value) {
        return super.allMatchingFrom('allowances', key, value)
    }
}

module.exports = allowancesModel