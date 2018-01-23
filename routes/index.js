var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var cors = require('cors')


router.get('/', function(req, res, next) {
  res.send('Welcome to the Airport Locator API!');
});

/* GET all airports. */
router.get('/:lat/:long', function(req, res, next) {
  knex.raw(`select name, latitude_deg, longitude_deg from airports where type != 'closed' and type != 'heliport' and type != 'balloonport' and
  (((latitude_deg*(Pi()/180)) >= ((${req.params.lat}*(Pi()/180)) - 0.05052095)) AND ((latitude_deg*(Pi()/180)) <= (((${req.params.lat}*(Pi()/180)) + 0.05052095)))) AND
  (((longitude_deg*(Pi()/180)) >= ((${req.params.long}*(Pi()/180)) - asin(sin(0.05052095)/cos((${req.params.lat}*(Pi()/180)))))) AND ((longitude_deg*(Pi()/180)) <= ((${req.params.long}*(Pi()/180)) + asin(sin(0.05052095)/cos((${req.params.lat}*(Pi()/180))))))) AND
  acos(sin(${req.params.lat}*(Pi()/180)) * sin(latitude_deg*(Pi()/180)) + cos(${req.params.lat}*(Pi()/180)) * cos(latitude_deg*(Pi()/180)) * cos(longitude_deg*(Pi()/180) - (${req.params.long}*(Pi()/180)))) <= 0.05052095`)
  .then(data => {
    res.json(data.rows)
  });
});

module.exports = router;
