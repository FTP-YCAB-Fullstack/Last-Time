const router = require('express').Router()
const OfficeController = require('../controllers/officeController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/offices' , authentication , OfficeController.getAll)
router.post('/offices' , authentication , authorization(['admin']) , OfficeController.create)
router.get('/offices/:id' , authentication , authorization(['admin']) , OfficeController.getDetail)
router.delete('/offices/:id' , authentication, authorization(['admin']), OfficeController.destroy)

module.exports = router