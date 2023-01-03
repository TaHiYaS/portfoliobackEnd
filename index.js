const express = require('express');  // import express
const app = express(); // create express app
const mongoose = require('mongoose'); // import mongoose
const expressValidator = require('express-validator'); // import express validator
const cookieParser = require('cookie-parser'); // import cookie parser
// import routes
const authRouter = require('./routes/valid'); // import user router
const userRouter = require('./routes/user');

require('dotenv').config(); // import dotenv

//for server netfily
app.use(function(req, res, next) { // set header for all requests
    res.header("Access-Control-Allow-Origin", "https://62d7a09bcc768072f66d1283--comfy-pudding-e8c45e.netlify.app");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
    }
);
//core for cors policy
const cors = require("cors");
const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig));
// Connect to MongoDB
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on ('connected', () => { 
    console.log('Connected to database ' + process.env.DATABASE); 
})  
mongoose.disconnect = () => { 
    console.log('Disconnected from database ' + process.env.DATABASE); 
} 
//MIddleware
app.use(express.json()); // use json middleware
app.use(expressValidator()); // use express validator middleware
app.use(cookieParser()); // use cookie parser middleware

// routes Middleware
app.use('/users', authRouter) // use user router
app.use('/users', userRouter) // use user routery

app.get('/', (request, response) => { // get request to /
    response.json({ // send response
        message: 'Welcome to the API' // send message
        }) // end send response
    }
); 

const PORT = process.env.PORT || 3000;  // set port to process.env.NODE_ENV or 3000 if not set in .env file (for Heroku)
app.listen(PORT, () => // listen on port 3000
    console.log(`Listening on port ${PORT}`));  // log that we are listening on port 3000