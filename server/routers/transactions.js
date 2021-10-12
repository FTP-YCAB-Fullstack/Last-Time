const router = require('express').Router()
const transactionController = require('../controllers/transactionController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const Upload = require('../utils/Upload')

router.get('/transactions' , authentication, transactionController.getAll)
router.post('/transactions', authentication , transactionController.create)
router.get('/transactions/user' , authentication , authorization(['user']) , transactionController.getByToken)
router.post('/transactions/user' , authentication , authorization(['user']) , transactionController.createByToken)
router.get('/transactions/status/count' , authentication , transactionController.countEachStatus)
router.get('/transactions/:id', authentication , transactionController.getDetail)
router.delete('/transactions/:id' , authentication , transactionController.delete)
router.patch('/transactions/:id/receive' , authentication , authorization(['user']) , Upload.single('image') , transactionController.receiveTransaction)
router.patch('/transactions/:id/status' , authentication , transactionController.updateStatus)


module.exports = router