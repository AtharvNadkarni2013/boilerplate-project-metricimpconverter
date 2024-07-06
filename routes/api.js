'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  app.get('/api/convert',(req, res) => {
    let convertHandler = new ConvertHandler();
    const { input } = req.query
    const [initNum, initUnit] = [convertHandler.getNum(input), convertHandler.getUnit(input)]

    
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
    res.json({initNum, initUnit, returnNum, returnUnit, string})
  })
  

};
