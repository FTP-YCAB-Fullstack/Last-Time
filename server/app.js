require('dotenv').config()
const express = require('express')
const app = express()
const handleError = require('./middlewares/handleError')
const port = process.env.APP_PORT
const mongoose = require('mongoose')


// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.use(handleError)

const {DB_HOST , DB_PORT , DB_NAME} = process.env
const dbURI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`
mongoose.connect(dbURI)
    .then(() => 
        app.listen(port, () => {
            console.log('connection database success')
            console.log(`server running at port ${port}`)
            console.log('running')
        })
    ).catch(err => console.log(err))

