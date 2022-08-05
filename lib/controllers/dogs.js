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
  });
