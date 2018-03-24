const Model = require('./model.js')(`allowances`)
const schedule = require('node-schedule')


class allowancesModel extends Model{
    constructor() {
        super()

        this.transferJobs = {}
    }

    static create(body) {
        //schedule transfer job
        // super.create(body).then(transfer => {
        //     let id = transfer.id
        //     let rule = new schedule.RecurrenceRule()
        //     rule.hour(0)
        //     rule.minute(0)
        //     rule.dayOfWeek(transfer.weekday - 1)

        //     transferJobs[id] = schedule.scheduleJob(rule, )
        // })
    }

    static update(id, body) {
        //update transfer schedule
        return super.update(id, body)
    }

    static destroy(id) {
        //delete transfer job
        return super.destroy(id)
    }

    static allMatchingWhere(key, value) {
        return super.allMatchingFrom('allowances', key, value)
    }
}

module.exports = allowancesModel