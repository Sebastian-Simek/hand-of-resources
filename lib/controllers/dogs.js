const { Router } = require('express');
const { Dog } = require('../models/Dog');
module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const dog = await Dog.getAll();
      res.json(dog);
    } catch(e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const singleDog = await Dog.getById(req.params.id);
      res.json(singleDog);
    } catch(e) {
      next(e);
    }
  });
