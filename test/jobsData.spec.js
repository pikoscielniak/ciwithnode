var expect = require("chai").expect;
var jobModel = require("../models/Job");
var mongoose = require('mongoose');
var dbCon = 'mongodb://localhost/jobfinder';

function resetJobs(callback) {
    if (mongoose.connection.collection.jobs) {
        mongoose.connection.collection.jobs.drop(callback);
    }
    else {
        callback();
    }
}

describe('get jobs', function() {

    it('should never be empty since jobs are seeded', function(done) {
        mongoose.connect(dbCon, function() {
            resetJobs(function() {
                jobModel.seedJobs(function(err) {
                    if(err) done(err);
                    mongoose.model('Job').find({}).exec(function(err, collection) {
                        if (err) {
                            return done(err);
                        }
                        expect(collection.length).to.be.at.least(1);
                        done();
                    });
                })
            });
        });
    });
});