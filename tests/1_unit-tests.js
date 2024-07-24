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
        assert.doesNotThrow(() => convertHandler.convert('7/2.3', 'kg'), 'This should not throw an error, since 7/2.3 is a fraction with a decimal')
    }), test('Double-Fractional Input', () => {
        assert.throw(() => convertHandler.convert('7/2/3', 'kg'))
    }), test('Default Input', () => {
        assert.equal(convertHandler.getNum('kg'), 1)
    }), test('Valid Unit Input', () => {
        assert.doesNotThrow(() => convertHandler.getUnit('lbs'))
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
    }), test('Gallons to Liters', () => {
        const randomGallonValue = Math.random() * 30;
        const literValue = randomGallonValue * 3.78541;
        assert.equal(convertHandler.convert(randomGallonValue, 'gal'), parseFloat(literValue.toFixed(5)))
        assert.equal(convertHandler.getReturnUnit('gal'), 'L')
    }), test('Liters to Gallons', () => {
        const randomLiterValue = Math.random() * 30;
        const gallonValue = randomLiterValue * (1/3.78541);
        assert.equal(convertHandler.convert(randomLiterValue, 'L'), parseFloat(gallonValue.toFixed(5)))
    }), test('Miles to Kilometers', () => {
        const randomMileValue = Math.random() * 30;
        const kilometerValue = randomMileValue * (1.60934);
        assert.equal(convertHandler.convert(randomMileValue, 'mi'), parseFloat(kilometerValue.toFixed(5)))
    }), test('Kilometers to Miles', () => {
        const randomKmValue = Math.random() * 30;
        const mileValue = randomKmValue * (1/1.60934);
        assert.equal(convertHandler.convert(randomKmValue, 'km'), parseFloat(mileValue.toFixed(5)))
    }), test('Pounds to Kilograms', () => {
        const randomPoundValue = Math.random() * 30;
        const kgValue = randomPoundValue * (0.453592);
        assert.equal(convertHandler.convert(randomPoundValue, 'lbs'), parseFloat(kgValue.toFixed(5)))
    })
    , test('Kilograms to Pounds', () => {
        const randomKgValue = Math.random() * 30;
        const poundValue = randomKgValue * (1/0.453592);
        assert.equal(convertHandler.convert(randomKgValue, 'kg'), parseFloat(poundValue.toFixed(5)))
    })
});