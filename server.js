var express = require('express');
var mongoose = require('mongoose');
var app = express();

var jobModel = require("./models/Job");
var mongoDb = require("./services/mongoDb");

app.use(express.static('public'));
app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/api/jobs', function(req, res) {
    mongoose.model('Job').find({}).exec(function(err, collection) {
        if(err){
            console.log(err);
        }
        res.send(collection);
    });
});

app.get('*', function(req, res) {
    res.render('index');
});

mongoDb.connect();

app.listen(process.env.PORT, process.env.IP);