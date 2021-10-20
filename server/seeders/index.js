require('dotenv').config({path: '../.env'})
const mongoose = require('mongoose')

const User = require('./User')
const Office = require('./Office')
const Customer = require('./Customer')
// User.admin(10)
// Office.generate(25)
// Customer.generate(28)
// Office.get()

const DB_URI = process.env.DB_URI
mongoose.connect(DB_URI).then(() => console.log('success generate data'))