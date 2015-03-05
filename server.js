var express = require('express');
var mongoose = require('mongoose');
var app = express();

var jobModel = require("./models/Job");

app.use(express.static('public'));
app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/api/jobs', function(req, res) {
    mongoose.model('Job').find({}).exec(function(err, collection) {
        if (err) {
            console.log(err);
        }
        res.send(collection);
    });
});

app.get('*', function(req, res) {
    res.render('index');
});

var dbCon = process.env.DB_CONNECTION || 'mongodb://localhost/jobfinder';

mongoose.connect(dbCon);

var con = mongoose.connection;
con.once('open', function(err) {
    if (err) {
        return console.log('error');
    }
    jobModel.seedJobs();
    console.log('connected to mongodb successfully!');
});

app.listen(process.env.PORT, process.env.IP);