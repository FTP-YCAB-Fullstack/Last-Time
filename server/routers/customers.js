const router = require('express').Router()
const CustomerController = require('../controllers/customerController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/customers' , authentication , authorization(['admin']) , CustomerController.getAll)
router.post('/customers' , authentication , authorization(['user']) , CustomerController.create)
router.get('/customers/status' , authentication , authorization(['user']) , CustomerController.checkStatus)
router.get('/customers/office' , authentication , CustomerController.getByToken)
router.get('/customers/:officeId/office' , authentication , CustomerController.getByOffice)
router.delete('/customers/:id', authentication , authorization(['admin']) , CustomerController.delete)
router.patch('/customers/:id' , authentication , CustomerController.updateStatus)


module.exports = router