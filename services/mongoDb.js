var mongoose = require('mongoose');
var jobModel = require("../models/Job");

var dbCon = process.env.DB_CONNECTION || 'mongodb://localhost/jobfinder';

exports.connect = function(callback) {
    
    mongoose.connect(dbCon, callback);

    var con = mongoose.connection;
    con.once('open', function(err) {
        if (err) {
            return console.log('error');
        }
        jobModel.seedJobs();
        console.log('connected to mongodb successfully!');
    });
}