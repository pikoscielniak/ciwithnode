var expect = require("chai").expect;
var mongoose = require('mongoose');

var mongoDb = require("../services/mongoDb");


describe('get jobs', function() {

    before(function(done) {
        if (mongoose.connection.readyState === 0) {
            mongoDb.connect(done);
        }
        else {
            done();
        }
    });

    it('should never be empty since jobs are seeded', function(done) {
        mongoose.model('Job').find({}).exec(function(err, collection) {
            if (err) {
                return done(err);
            }
            expect(collection.length).to.be.at.least(1);
            done();
        });
    });
});