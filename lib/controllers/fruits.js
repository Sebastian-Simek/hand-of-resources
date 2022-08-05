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
  });
