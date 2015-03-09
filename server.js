var express = require('express');
var app = express();
var jobsData = require("./jobsData");

require("./jobsService")(jobsData,app);

app.use(express.static('public'));
app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('*', function(req, res) {
    res.render('index');
});

var dbCon = process.env.DB_CONNECTION || 'mongodb://localhost/jobfinder';


jobsData.connectDb(dbCon)
    .then(function() {
        jobsData.seedJobs();
        console.log('connected to mongodb successfully!');
    });
app.listen(process.env.PORT, process.env.IP);