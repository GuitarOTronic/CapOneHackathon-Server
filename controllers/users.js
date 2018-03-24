const Controller = require('./controller.js')('users')
const usersModel = require(`../models/users.js`)
const allowancesModel = require(`../models/allowances.js`)
const requestsModel = require(`../models/requests.js`)
const goalsModel = require(`../models/goals.js`)
const apicontroller = require(`../coapi/apicontroller.js`);

class usersController extends Controller {
    constructor () {
        super()
    }

    static userMinusFamily (userId) {
        return usersModel.one(userId)
            .then(user => {
                let userObject = user
                let match = user.user_type === 'parent' ? ['parent_id', user.id] : ['child_id', user.id]
                let userData = [allowancesModel.allMatchingWhere(...match), requestsModel.allMatchingWhere(...match), goalsModel.allMatchingWhere('user_id', user.id)]
                return Promise.all(userData)
                    .then(data => {
                        userObject.allowances = user.user_type === 'parent' ? [] : data[0]
                        userObject.requests = data[1]
                        userObject.goals = data[2]
                        return userObject
                    })
            })
    }

    static one (req, res, next) {
        let givenId = req.params.id
        return usersController.userMinusFamily(givenId)
            .then(mainUser => {
                let family = [usersModel.allMatchingFrom('parents_children', 'parent_id', mainUser.id), usersModel.allMatchingFrom('parents_children', 'child_id', mainUser.id)]
                return Promise.all(family)
                    .then(allFamily => {
                        allFamily = [...allFamily[0], ...allFamily[1]]
                        let searchKey = mainUser.user_type === 'parent' ? 'child_id' : 'parent_id'
                        let familyIds = allFamily.reduce((idArr, familyRelationObject) => {
                            return idArr.includes(familyRelationObject[searchKey]) ? [...idArr] : [...idArr, familyRelationObject[searchKey]]
                        }, [])
                        let familyUserCalls = familyIds.map(id => usersController.userMinusFamily(id))
                        return Promise.all(familyUserCalls)
                            .then(familyMembers => {
                                let familyKey = mainUser.user_type === 'parent' ? 'children' : 'parents'
                                mainUser.children = []
                                mainUser.parents = []
                                mainUser[familyKey] = familyMembers
                                return res.status(200).json({users: mainUser})
                            })
                    })
            })
    }
}

module.exports = usersController
