require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const handleError = require('./middlewares/handleError')
const port = process.env.APP_PORT
const mongoose = require('mongoose')
const routers = require('./routers')
var passport = require("passport");

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(passport.initialize());

// static serve
app.use('/assets' , express.static('./storage/assets'))

app.use(routers)

app.use(handleError)

require("./utils/passport");






const DB_URI = process.env.DB_URI
mongoose.connect(DB_URI)
    .then(() => 
        app.listen(port, () => {
            console.log('Connection Database Success')
            console.log('Database URI => ' + DB_URI)
            console.log(`Server Running at Port => ${port}`)
        })
    ).catch(err => console.log(err))

