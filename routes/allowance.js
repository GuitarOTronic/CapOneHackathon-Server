const router = require('express').Router()
const { allowanceController }= require('../controllers')

router.get('/:id', allowanceController.one)
router.post('/', allowanceController.create)
router.patch('/:id', allowanceController.update)
router.delete('/:id', allowanceController.destroy)


module.exports = router
