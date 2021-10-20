const router = require('express').Router()
const UserController = require('../controllers/userController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const pagination = require('../middlewares/pagination')
var passport = require("passport");
const User = require('../models/User')

router.post('/users/register' , UserController.register)
router.post('/users/login' , UserController.login)
router.get('/users/detail' , authentication , UserController.detailByToken)
router.post('/users/admin' ,authentication , authorization(['admin']) , UserController.createAdmin)
router.get('/users/roles/count' , authentication , authorization(['admin']) , UserController.totalByRoles)
router.get('/users/:id' , authentication , UserController.detail)
router.delete('/users/:id', authentication , authorization(['admin']) , UserController.deleteUser)
router.get('/users/:role/role' , authentication , pagination , authorization(['admin']) , UserController.getByRole)
router.get('/users/:subRole/subRole', authentication , pagination , authorization(['admin']) , UserController.getBySubRole)

// router.get('/auth/google', UserController.auth);
// router.get('/auth/google/callback', UserController.googleLogin);

router.get(
	"/auth/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
	"/auth/google/callback",
	passport.authenticate("google", { failureRedirect: "/", session: false }),
	async function(req, res) {
        try {
            var token = req.user.token;
            const response=JSON.stringify(req.user)
            // APP_CLIENT
            res.redirect(process.env.APP_CLIENT+"auth/login?payload=" + response);
        } catch (error) {
            next(error)
        }
	}
);


module.exports = router