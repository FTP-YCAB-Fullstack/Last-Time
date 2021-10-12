const router = require('express').Router()
const users = require('./users')
const transactions = require('./transactions')
const offices = require('./offices')
const customers = require('./customers')

router.use(users)
router.use(transactions)
router.use(offices)
router.use(customers)

module.exports = router