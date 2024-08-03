const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test('Whole Number Input', function() {
        const input = '3gal'
        assert.equal(3, convertHandler.getNum(input));
    });
    test('Decimal Number Input', function() {
        const input = '3.5gal'
        assert.equal(3.5, convertHandler.getNum(input));
    });
    test('Fractional Input', function() {
        const input = '3/2gal'
        assert.equal(1.5, convertHandler.getNum(input));
    });
    test('Fractional with Decimal Input', function() {
        const input = '5.5/2gal'
        assert.equal(2.75, convertHandler.getNum(input));
    });
    test('Error on Double Fractional Input', function() {
        const input = '3/2/3gal'
        assert.isNaN(convertHandler.getNum(input));
    });
    test('Default to 1', function() {
        const input = 'gal'
        assert.equal(1, convertHandler.getNum(input));
    });
    test('Valid Unit', function() {
        const input = '45gal'
        assert.equal('gal', convertHandler.getUnit(input));
    });
    test('Invalid Unit', function() {
        const input = '45ga'
        assert.isNaN(convertHandler.getUnit(input));
    });
    test('Correct Return Unit', function() {
        const input = '45gal'
        assert.equal('L', convertHandler.getReturnUnit(convertHandler.getUnit(input)));
    });
    test('Correct Spelled Out Unit', function() {
        const input = '45gal'
        assert.equal('gallons', convertHandler.spellOutUnit(convertHandler.getUnit(input)));
    });
    test('Correct Convert gal to L', function() {
        const input = '1gal'
        const num = convertHandler.getNum(input);
        const unit = convertHandler.getUnit(input);
        assert.equal(3.78541, convertHandler.convert(num, unit));
    });
    test('Correct Convert L to gal', function() {
        const input = '1L'
        const num = convertHandler.getNum(input);
        const unit = convertHandler.getUnit(input);
        assert.equal(0.26417, convertHandler.convert(num, unit));
    });
    test('Correct Convert mi to km', function() {
        const input = '1mi'
        const num = convertHandler.getNum(input);
        const unit = convertHandler.getUnit(input);
        assert.equal(1.60934, convertHandler.convert(num, unit));
    });
    test('Correct Convert km to mi', function() {
        const input = '1km'
        const num = convertHandler.getNum(input);
        const unit = convertHandler.getUnit(input);
        assert.equal(0.62137, convertHandler.convert(num, unit));
    });
    test('Correct Convert lbs to kg', function() {
        const input = '1lbs'
        const num = convertHandler.getNum(input);
        const unit = convertHandler.getUnit(input);
        assert.equal(0.45359, convertHandler.convert(num, unit));
    });
    test('Correct Convert kg to lbs', function() {
        const input = '1kg'
        const num = convertHandler.getNum(input);
        const unit = convertHandler.getUnit(input);
        assert.equal(2.20462, convertHandler.convert(num, unit));
    });
});