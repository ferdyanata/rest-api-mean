// express helps us create dynamic apps easily
const express = require('express');

/**
 * set up express app
 * when we initialize express(), we are able to use its HTTP methods
 * such as GET, POST, PUT, DELETE.
 */
const app = express();

/**
 * creates a path for address to access the GET request.
 */
app.get('/api', function(req, res){
    console.log('GET request');
    /**
     * sends end as a response, otherwise it'll be in a loop looking for a response.
     */
    res.send({name: 'Yoshi'});
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