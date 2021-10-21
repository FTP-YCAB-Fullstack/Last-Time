const router = require('express').Router()
const users = require('./users')
const transactions = require('./transactions')
const offices = require('./offices')
const customers = require('./customers')
const apiController = require('../controllers/apiController')

router.use(users)
router.use(transactions)
router.use(offices)
router.use(customers)

router.get('/api/weather' , apiController.getData)

module.exports = router