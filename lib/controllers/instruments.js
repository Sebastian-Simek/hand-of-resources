const { Router } = require('express');
const { Instrument } = require('../models/Instrument');

module.exports = Router()
  .get('/', async (req, res) => {
    const instrument = await Instrument.getAll();
    res.json(instrument);
  });
