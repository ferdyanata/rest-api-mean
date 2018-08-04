// express helps us create dynamic apps easily
const express = require('express');
const bodyParser = require('body-parser');
// using mongoose will allow MongoDB to find the database we created in models
const mongoose = require('mongoose');

/**
 * set up express app
 * when we initialize express(), we are able to use its HTTP methods
 * such as GET, POST, PUT, DELETE.
 */
const app = express();
// connect to mongodb
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

// serves as a middleware that provides static pages/information such as jpeg
// as a result, it doesn't need to run the api functions
app.use(express.static('public'));

// allow us to extract data in raw json format
app.use(bodyParser.json());

/**
 * initialize routes so that api.js requires /api from each
 * request.
 */
app.use('/api', require('./routes/api'));

/**
 * Error handling middleware
 * next will tell the compiler to move onto the next middleware which is error handler
 */
app.use(function(err, req, res, next){
    // console.log(err);
    // status(422) is a processing error
    res.status(422).send(
    {
        error: err.message
    });
});

/**
 * creates a path for address to access the GET request.
 */
app.get('/api', function(req, res){
    console.log('GET request');
    /**
     * sends end as a response, otherwise it'll be in a loop looking for a response.
     */
    res.send(
        {
            name: 'Yoshi'
        });
    // res.end();
});

/**
 * IMPORTANT - this must be on the bottom
 * process.env.port listens to the port it is defaulted to. I.e.
 * when using cloud services like haroku otherwise it'll listen to 4000
 */
app.listen(process.env.port || 4000, function(){
    console.log('now listening for requests');
});