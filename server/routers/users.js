const router = require('express').Router()
const UserController = require('../controllers/userController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/users/register' , UserController.register)
router.post('/users/login' , UserController.login)
router.get('/users/detail' , authentication , UserController.detailByToken)
router.post('/users/admin' ,authentication , authorization(['admin']) , UserController.createAdmin)
router.get('/users/roles/count' , authentication , authorization(['admin']) , UserController.totalByRoles)
router.get('/users/:id' , authentication , UserController.detail)
router.delete('/users/:id', authentication , authorization(['admin']) , UserController.deleteUser)
router.get('/users/:role/role' , authentication , authorization(['admin']) , UserController.getByRole)
router.get('/users/:subRole/subRole', authentication , authorization(['admin']) , UserController.getBySubRole)

module.exports = router