const express = require('express');
/**
 * creating an expreqs.routes() allows us to access its HTTP methods. 
 * (GET, POST, PUT and DELETE)
 */
const routes = express.Router();
const Ninja = require('../models/ninja.js');

routes.get('/ninjas', function (req, res) {
  res.send({
    type: 'GET'
  });
});

routes.post('/ninjas', function (req, res) {
  // req.body will retrieve the name, rank and availability from ninja.js
  // var ninja = new Ninja(req.body);
  // save this data into the database upon posting
  // ninja.save();

  // create will automatically save new data onto database
  Ninja.create(req.body).then(function (ninja) {
    res.send(ninja);
  });
});

routes.put('/ninjas/:id', function (req, res) {
  res.send({
    type: 'PUT'
  });
});

routes.delete('/ninjas/:id', function (req, res) {
  res.send({
    type: 'DELETE'
  });
});

// export this file so other files can use it
module.exports = routes;