'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  app.get('/api/convert',(req, res) => {
    let convertHandler = new ConvertHandler();
    const { input } = req.query
    const units = ["gal", "L", "mi", "km", "lbs", "kg"]
    let initNum, initUnit, errorValue
    try {

    [initNum, initUnit] = [convertHandler.getNum(input), convertHandler.getUnit(input)]

    }
    catch (err) {
      try {
        const unit = convertHandler.getUnit(input)
      } catch (err) {
        errorValue = "invalid unit"
      }
      try {
        const num = convertHandler.getNum(input)
      } catch (err) {
        if (errorValue == "invalid unit") {
          errorValue = "invalid number and unit"
        } else {
        errorValue = "invalid number"
        }
      }
      return res.send(errorValue)
    }

    
    const returnNum = convertHandler.convert(initNum.toString(), initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
    res.json({initNum, initUnit, returnNum, returnUnit, string})
  })
  

};
