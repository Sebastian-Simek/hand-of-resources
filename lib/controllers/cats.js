const { Router } = require('express');
const { Cat } = require('../models/Cat');
module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const cat = await Cat.getAll();
      res.json(cat);
    } catch(e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const singleCat = await Cat.getById(req.params.id);
      res.json(singleCat);
    } catch(e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const newCat = await Cat.insert(req.body);
      res.json(newCat);
    } catch(e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try{
      const updatedCat = await Cat.updateById(req.params.id, req.body);
      res.json(updatedCat);
    } catch(e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const oldCat = await Cat.delete(req.params.id);
      res.json(oldCat);
    } catch(e) {
      next(e);
    }
  });
