const router = require('express').Router()
const { usersController } = require('../controllers')

router.get('/:id', usersController.one)
router.post('/', usersController.create)
router.patch('/:id', usersController.update)
router.delete('/:id', usersController.destroy)


module.exports = router
