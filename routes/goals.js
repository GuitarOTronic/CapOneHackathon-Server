const router = require('express').Router()
const { goalsController }= require('../controllers')

router.get('/:id', goalsController.one)
router.post('/', goalsController.create)
router.patch('/:id', goalsController.update)
router.delete('/:id', goalsController.destroy)


module.exports = router
