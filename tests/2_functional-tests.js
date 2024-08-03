const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test('Convert With Valid Input', function (done) {
        chai.request(server)
            .get('/api/convert')
            .query({
                input: '10L'
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, 10);
                assert.equal(res.body.initUnit, "L");
                assert.equal(res.body.returnNum, 2.64172);
                assert.equal(res.body.returnUnit, "gal");
                done();
            });
    });
    test('Convert With Invalid Unit', function (done) {
        chai.request(server)
            .get('/api/convert')
            .query({
                input: '32g'
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.text, "invalid unit");
                done();
            });
    });
    test('Convert With Invalid Number', function (done) {
        chai.request(server)
            .get('/api/convert')
            .query({
                input: '3/7.2/4kg'
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.text, "invalid number");
                done();
            });
    });
    test('Convert With Invalid Number And Unit', function (done) {
        chai.request(server)
            .get('/api/convert')
            .query({
                input: '3/7.2/4kilomegagram'
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.text, "invalid number and unit");
                done();
            });
    });
    test('Convert With No Number', function (done) {
        chai.request(server)
            .get('/api/convert')
            .query({
                input: 'L'
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, 1);
                assert.equal(res.body.initUnit, "L");
                assert.equal(res.body.returnNum, 0.26417);
                assert.equal(res.body.returnUnit, "gal");
                done();
            });
    });
});
