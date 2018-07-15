var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');;
var config = require('./config');
var port = process.env.PORT || 8080
var routes = require('./routes/routes.js')
var cors = require('cors');
var mongoUrl = config.mongo.url + config.mongo.dbName;
var User = require('./models/reservationmodel.js')
console.log("mongoUrl", mongoUrl);
mongoose.connect(mongoUrl, {
    useNewUrlParser: true
    });
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});
app.get('/setup', function(req, res) {
    console.log("Request is hitting")
    // create a sample user
    var nick = new User({
      firstName: 'Nick',
      lastName: 'Cerminara',
      email: 'jaysamariya21@gmail.com',
      noOfGuests: 5,
      comments: 'Please book this for Us',
      reservedOn: ''
    });
    // save the sample user
    nick.save(function(err) {
      if (err) throw err;
      console.log('User saved successfully');
      res.json({ success: true });
    });
});
app.use('/api', routes);
app.listen(port);
console.log(' http://localhost:' + port);