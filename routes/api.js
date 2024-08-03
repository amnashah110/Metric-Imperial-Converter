'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();
  const units = ['mi', 'km', 'L', 'gal', 'lbs', 'kg'];

  app.route('/api/convert')
    .get((req, res) => {
      const input = req.query.input;
      const num = convertHandler.getNum(input);
      const unit = convertHandler.getUnit(input);
      if (isNaN(num) && !units.includes(unit)) {
        return res.send('invalid number and unit');
      }
      if (isNaN(num)) {
        return res.send('invalid number');
      }
      if (!units.includes(unit)) {
        return res.send('invalid unit');
      }
      const returnNum = convertHandler.convert(num, unit);
      const returnUnit = convertHandler.getReturnUnit(unit);
      return res.send(convertHandler.getString(num, unit, returnNum, returnUnit));
    });

};
