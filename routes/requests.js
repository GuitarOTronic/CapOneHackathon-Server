const router = require('express').Router()
const { requestsController } = require('../controllers')

router.get('/:id', requestsController.one)
router.post('/', requestsController.create)
router.patch('/:id', requestsController.update)
router.delete('/:id', requestsController.destroy)


module.exports = router
