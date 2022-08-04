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
  });
