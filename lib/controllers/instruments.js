const { Router } = require('express');
const { Instrument } = require('../models/Instrument');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const instrument = await Instrument.getAll();
      res.json(instrument);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const singleInstrument = await Instrument.getById(req.params.id);
      res.json(singleInstrument);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try{ const newInstrument = await Instrument.insert(req.body);
      res.json(newInstrument);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const updatedInstrument = await Instrument.updateById(req.params.id, req.body);
      res.json(updatedInstrument);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try{
      const oldInstrument = await Instrument.delete(req.params.id);
      res.json(oldInstrument);
    } catch (e) {
      next(e);
    }
  });
