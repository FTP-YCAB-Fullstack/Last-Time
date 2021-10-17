require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const handleError = require('./middlewares/handleError')
const port = process.env.APP_PORT
const mongoose = require('mongoose')
const routers = require('./routers')
const Upload = require('./utils/Upload')



// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// static serve
app.use('/assets' , express.static('./storage/assets'))

app.use(routers)

// test upload image
app.post('/uploads/test' , Upload.single('image'), (req,res,next) => {
    if(!req.file) {
        return res.status(404).send("No such file uploaded")
    }
    res.status(200).send("File uploaded exists")
})

app.use(handleError)






const DB_URI = process.env.DB_URI
mongoose.connect(DB_URI)
    .then(() => 
        app.listen(port, () => {
            console.log('connection database success')
            console.log(`server running at port ${port}`)
            console.log('running')
        })
    ).catch(err => console.log(err))

