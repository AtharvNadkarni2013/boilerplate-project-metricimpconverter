const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    test('Whole Number Input', () => {
        assert.doesNotThrow(() => convertHandler.convert('72', 'kg'), 'This should not throw an error, since 72 is a whole number')
    }), test('Fractional Input', () => {
        assert.doesNotThrow(() => convertHandler.convert('7/2', 'kg'), 'This should not throw an error, since 7/2 is a fraction')
    }), test('Decimal Input', () => {
        assert.doesNotThrow(() => convertHandler.convert('7.2', 'kg'), 'This should not throw an error, since 7.2 is a decimal')
    }), test('Fractional Input With Numerator Decimal', () => {
        assert.doesNotThrow(() => convertHandler.convert('7.3/2', 'kg'), 'This should not throw an error, since 7.3/2 is a fraction with a decimal')
    }), test('Fractional Input With Denominator Decimal', () => {
        assert.doesNotThrow(() => convertHandler.convert('7/2.3', 'kg'), 'This should not throw an error, since 7/2.3 is a fraction with a decimal')
    }), test('Double-Fractional Input', () => {
        assert.throw(() => convertHandler.convert('7/2/3', 'kg'))
    }), test('Default Input', () => {
        assert.equal(convertHandler.getNum('kg'), 1)
    }), test('Valid Unit Input', () => {
        assert.doesNotThrow(() => convertHandler.getUnit('lb'))
        assert.doesNotThrow(() => convertHandler.getUnit('kg'))
        assert.doesNotThrow(() => convertHandler.getUnit('mi'))
        assert.doesNotThrow(() => convertHandler.getUnit('km'))
        assert.doesNotThrow(() => convertHandler.getUnit('gal'))
        assert.doesNotThrow(() => convertHandler.getUnit('L'))
    }), test('Invalid Unit Input', () => {
        assert.throw(() => convertHandler.getUnit('kp'))
        assert.throw(() => convertHandler.getUnit('gaz'))
    }), test('Return Unit Output', () => {
        assert.equal(convertHandler.getReturnUnit('gal'), 'L')
        assert.equal(convertHandler.getReturnUnit('L'), 'gal')
        assert.equal(convertHandler.getReturnUnit('mi'), 'km')
        assert.equal(convertHandler.getReturnUnit('km'), 'mi')
        assert.equal(convertHandler.getReturnUnit('lbs'), 'kg')
        assert.equal(convertHandler.getReturnUnit('kg'), 'lbs')
    }), test('Spelled Out Unit Output', () => {
        assert.equal(convertHandler.spellOutUnit('gal'), 'gallons')
        assert.equal(convertHandler.spellOutUnit('L'), 'liters')
        assert.equal(convertHandler.spellOutUnit('mi'), 'miles')
        assert.equal(convertHandler.spellOutUnit('km'), 'kilometers')
        assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds')
        assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms')
    })
});