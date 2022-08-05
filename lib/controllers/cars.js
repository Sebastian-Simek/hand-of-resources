const { Router } = require('express');
const { Car } = require('../models/Car');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const car = await Car.getAll();
      console.log(car);
      res.json(car);
    } catch (e) {
      next(e);
    }
  });
