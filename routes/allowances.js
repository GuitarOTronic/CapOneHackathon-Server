const router = require('express').Router()
const { allowancesController }= require('../controllers')

router.get('/:id', allowancesController.one)
router.post('/', allowancesController.create)
router.patch('/:id', allowancesController.update)
router.delete('/:id', allowancesController.destroy)


module.exports = router
