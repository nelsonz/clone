var express = require('express'),
	connect = require('connect'),
	ejs = require('ejs'),
	engine = require('ejs-locals'),
	http = require('http'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	models = require('./models');

var MONGO_URI = "mongodb://localhost:27017/chinahack";


// instantiate the app and connect to the database
var app = express(),
    db = mongoose.connect(MONGO_URI);

/* START UTILITY FUNCTIONS */
function errorCallback(err) {
  if (err) {
    console.log(err);
  }
};

function ensureAuthenticated(failureUrl) {
  return function(req, res, next) {
    req.session.redirect_loc = req.url;
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect(failureUrl);
    }
  }
}

// TODO: check if this actually makes sense on all things. sometimes they aren't a url at allm, and don't need an http in front of them
function forceAbsolute(url) {
  if (url && url.indexOf('://') < 0) {
    url = "http://" + url;
  }
  return url;
}

function stripSpaces(str) {
  return str.replace(/^\s+|\s+$/g,'');
}

function stripPunct(str) {
  return str.replace(/[^a-zA-Z0-9]+/g, '').replace('/ {2,}/',' ');
}

function shuffle(arr) {
  var m = arr.length, t, i;

  while (m) {
    i = Math.floor(Math.random() * m--);

    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }

  return arr;
}
/* END UTILITY FUNCTIONS */

// configure app and modules
app.engine('ejs', engine);
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({secret: 'autobahn'}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use('/', express.static(__dirname + '/public'));
  app.use(app.router);
  app.use(express.favicon(__dirname + '/public/img/favicon.ico'));
});

// instantiate Mongoose models
var User = mongoose.model('User', models.UserSchema),
	Post = mongoose.model('Hack', models.HackSchema),
	Comment = mongoose.model('Event', models.CommentSchema);
	Sub = mongoose.model('Sub', models.SubSchema);
	Message = mongoose.model('Message', models.MessageSchema);

/* START AUTHENTICATION FUNCTIONS */
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(

);

/* END AUTHENTICATION FUNCTIONS */

/* START REQUEST HANDLERS */
app.get('/login', function(req, res) {
	
});

app.get('/logout', function(req, res) {
	
});

app.get('/', function(req, res) {
	
});

app.get('/s', function(req, res) {
	
});

app.get('/s/:sub', function(req, res) {
	
});

app.post('/s/:sub', function(req, res) {
	
});

app.get('/u', function(req, res) {
	
});

app.get('/u/:name', function(req, res) {
	
});

app.post('/u/:name', function(req, res) {
	
});

app.get('/p/:id', function(req, res) {
	
});

app.post('/p/submit', function(req, res) {
	
});

app.post('/p/:id/comment', function(req, res) {
	
});

app.post('/k/:post', function(req, res) {
	
});

app.post('/k/:post/:comment', function(req, res) {
	
});

app.post('/n/:user', function(req, res) {
	
});

app.get('/m/:id', function(req, res) {
	
});

app.post('/m/send', function(req, res) {
	
});

app.listen(process.env.PORT || process.argv[2] || 8000);
