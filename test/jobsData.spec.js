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

    it('should never be empty since jobs are seeded', function(done) {
        connectDb(dbCon)
            .then(resetJobs)
            .then(jobModel.seedJobs)
            .then(findJobs)
            .then(function(jobsList) {
                expect(jobsList.length).to.be.at.least(1);
                done();
            });
    });
});