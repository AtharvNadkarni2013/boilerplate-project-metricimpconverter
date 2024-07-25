const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test("Valid Input", function (done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=10L')
            .end(function (err, res) {
                assert.equal(res.status, 200, "Response status to be 200")
                assert.equal(res.body.initNum, 10)
                assert.equal(res.body.initUnit, "L")
                assert.equal(res.body.returnNum, 2.64172)
                assert.equal(res.body.returnUnit, "gal")
                assert.equal(res.body.string, "10 liters converts to 2.64172 gallons")
                done()
            })
    }),
    test("Invalid Unit", function (done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=32g')
            .end(function (err, res) {
                assert.equal(res.status, 200, "Response status to be 200")
                assert.equal(res.text, "invalid unit")
                done()
            })
    }),
    test("Invalid Number", function (done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=3/7.2/4kg')
            .end(function (err, res) {
                assert.equal(res.status, 200, "Response status to be 200")
                assert.equal(res.text, "invalid number")
                done()
            })
    }), test("Invalid Number AND Unit", function (done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=3/7.2/4kilomegagram')
            .end(function (err, res) {
                assert.equal(res.status, 200, "Response status to be 200")
                assert.equal(res.text, "invalid number and unit")
                done()
            })
    }), test("No Number", function (done) {
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert?input=kg')
            .end(function (err, res) {
                assert.equal(res.status, 200, "Response status to be 200")
                assert.equal(res.body.initNum, 1)
                assert.equal(res.body.initUnit, "kg")
                assert.equal(res.body.returnNum, 2.20462)
                assert.equal(res.body.returnUnit, "lbs")
                assert.equal(res.body.string, "1 kilogram converts to 2.20462 pounds")
                done()
            })
    })
});
