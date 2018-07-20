const express = require('express');
/**
 * creating an expreqs.routes() allows us to access its HTTP methods. 
 * (GET, POST, PUT and DELETE)
 */
const routes = express.Router();

routes.get('/ninjas', function(req, res){
  res.send({type: 'GET'});
});

routes.get('/ninjas', function(req, res){
  res.send({type: 'POST'});
});

routes.put('/ninjas', function(req, res){
  res.send({type: 'PUT'});
});

routes.delete('/ninjas', function(req, res){
  res.send({type: 'DELETE'});
});
module.exports = routes;
