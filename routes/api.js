'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  app.get('/api/convert',(req, res) => {
    let convertHandler = new ConvertHandler();
    const { input } = req.query
    const units = ["gal", "L", "mi", "km", "lbs", "kg"]
    try {

    const [initNum, initUnit] = [convertHandler.getNum(input), convertHandler.getUnit(input)]

    if (!units.includes(input) && initNum === 1) {
      return res.contentType('text').send('invalid unit')
    }} catch (err) {
      if (!units.includes(input)) {
        return res.contentType('text').send('invalid number and unit')
      }
      return res.contentType('text').send('invalid number')
    }

    if (initNum=="invalid") {
      return res.contentType('text').send('invalid number')
    }

    if (!units.includes(input) && initNum=="invalid") {
      return res.contentType('text').send('invalid number and unit')
    }

    
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
    res.json({initNum, initUnit, returnNum, returnUnit, string})
  })
  

};
