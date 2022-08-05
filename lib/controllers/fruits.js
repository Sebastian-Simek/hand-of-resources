const { Router } = require('express');
const { Fruit } = require('../models/Fruit');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const fruit = await Fruit.getAll();
      res.json(fruit);
    } catch(e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const singleFruit = await Fruit.getById(req.params.id);
      res.json(singleFruit);
    } catch (e) {
      next(e);
    }
  });
