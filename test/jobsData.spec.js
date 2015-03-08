var expect = require("chai").expect;
var jobModel = require("../models/Job");
var mongoose = require('mongoose');
var Promise = require("bluebird");
var dbCon = 'mongodb://localhost/jobfinder';


function resetJobs() {
    return new Promise(function(resolve, reject) {
        mongoose.connection.collections['jobs'].drop(resolve, reject);
    });
}

function findJobs(query) {
    return Promise.cast(mongoose.model('Job').find(query).exec());
}

var connectDb = Promise.promisify(mongoose.connect, mongoose);

describe('get jobs', function() {

    var jobs;

    before(function(done) {
        connectDb(dbCon)
            .then(resetJobs)
            .then(jobModel.seedJobs)
            .then(findJobs)
            .then(function(collection) {
                jobs = collection;
                done();
            });
    });

    it('should never be empty since jobs are seeded', function() {
        expect(jobs.length).to.be.at.least(1);
    });

    it('should have a job with a title', function() {
        expect(jobs[0].title).to.not.be.empty;
    });
    
    it('should have a job with a description', function() {
        expect(jobs[0].description).to.not.be.empty;
    });
});