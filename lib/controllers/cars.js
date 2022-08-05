const { Router } = require('express');
const { Car } = require('../models/Car');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const car = await Car.getAll();
      res.json(car);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const singleCar = await Car.getById(req.params.id);
      res.json(singleCar);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try { const newCar = await
    Car.insert(req.body);
    res.json(newCar);
    } catch(e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const updatedCar = await Car.updateById(req.params.id, req.body);
      res.json(updatedCar);
    } catch(e) {
      next(e);
    }
  });
