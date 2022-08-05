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
  })
  .post('/', async (req, res, next) => {
    try{
      const newFruit = await Fruit.insert(req.body);
      res.json(newFruit);
    } catch(e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const updatedFruit = await Fruit.updateById(req.params.id, req.body);
      res.json(updatedFruit);
    } catch(e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const oldFruit = await Fruit.delete(req.params.id);
      res.json(oldFruit);
    } catch(e) {
      next(e);
    }
  });
