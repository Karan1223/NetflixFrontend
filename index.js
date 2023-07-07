const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
require('dotenv').config()
const port = process.env.PORT 

const app = express()




// get settings
const settings = require('./config/settings')

// mongo db url
const db = settings.mongoDBUrl

// attempt to connect with DB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected successfully.'))
    .catch(err => console.log(err))

// middleware for bodyparser
app.use(bodyParser.urlencoded({extended: false}))

app.get('/',(req,res) => {
    console.log("Project is running.")
})

    // Get profile routes
const profile = require('./routes/api/CRUD')
const auth = require('./routes/api/auth')

    // actual routes
app.use('/api/watchlist', profile)

app.use('/api/auth', auth)

// Config for JWT strategy
require('./strategies/jsonwtStrategy')(passport)
/**
 * @api {get} Handles all not found URLs.
 */

    app.get('*', function (req, res) {
        res.send('error');
    });
    
app.listen(port, () => console.log(`App running at port : ${port}`))