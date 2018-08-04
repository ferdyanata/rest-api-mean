const express = require('express');
/**
 * creating an express.router() allows us to access its HTTP methods. 
 * (GET, POST, PUT and DELETE)
 */
const router = express.Router();
const Ninja = require('../models/ninja.js');

router.get('/ninjas', function (req, res, next) {
  // aggregate().near is new in mongoose 5.0 +
  Ninja.aggregate().near({
    near: {
      // GeoJSON uses a point system to map lng and lat coordinates
      'type': 'Point',
      'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)]
    },
    maxDistance: 100000,
    spherical: true,
    distanceField: "dis"
  }).then(function (ninjas) {
    res.send(ninjas);
  }).catch(next);
});

/**
 * 'next' argument in this method is the error handling middleware that returns 
 * feedback to the user.
 */
router.post('/ninjas', function (req, res, next) {
  // req.body will retrieve the name, rank and availability from ninja.js
  // var ninja = new Ninja(req.body);
  // save this data into the database upon posting
  // ninja.save();

  // create will automatically save new data onto database
  Ninja.create(req.body).then(function (ninja) {
    res.send(ninja);
    // next will tell the compiler to move onto the next middleware which is error handler
  }).catch(next);
});

router.put('/ninjas/:id', function (req, res) {
  // find the ninja and update its requested body
  Ninja.findByIdAndUpdate({
    _id: req.params.id
  }, req.body).then(function (ninja) {
    // return the new and updated ninja back to the console. If we don't do this
    // it will return the previous ninja
    Ninja.findOne({
      _id: req.params.id
    }).then(function (ninja) {
      res.send(ninja);
    });
  });
});

router.delete('/ninjas/:id', function (req, res) {
  // Ninja.findByIdAndRemove is a mongoose method
  /**
   * find the user id and remove form db, then return a new list of ninja's available in the DB
   */
  Ninja.findByIdAndRemove({
    _id: req.params.id
  }).then(function (ninja) {
    res.send(ninja);
  });
});

// export this file so other files can use it
module.exports = router;