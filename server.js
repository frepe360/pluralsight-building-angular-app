var express = require('express'),
  logger = require('morgan'),
  stylus = require('stylus'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path) {
    return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser());
app.use(stylus.middleware(
  {
    src: __dirname + '/public',
    compile: compile
  }
))

app.use(express.static(__dirname + '/public'));

if (env === 'development') {
  mongoose.connect('mongodb://mv_user:mv_password@localhost/multivision');
} else {
  mongoose.connect('mongodb://mv_user:mv_password@ds037087.mongolab.com:37087/multivision');
}
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
  console.log('multivision db opened');
});

var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage; 
Message.findOne().exec(
  function(err, msg) {
    if (err) {
      console.log('Error: ' + err);
      return; 
    }
    if (!msg) {
      console.log('msg is null');
      return;
    }
    mongoMessage = msg.message;
});

app.get('/partials/:partialPath', function(req, res) {
  res.render('partials/' + req.params.partialPath);
});

app.get('*', function(req, rsp) {
  rsp.render('index', {
    mongoMessage: mongoMessage
  }) 
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port ' + port + '...');
