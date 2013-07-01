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
	Post = mongoose.model('Post', models.PostSchema),
	Comment = mongoose.model('Comment', models.CommentSchema);
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
		res.render('index',{
		title: 'Clone',
		});
});

app.get('/s', function(req, res) {

});

app.get('/s/:sub', function(req, res) {

});

app.post('/s/:sub', function(req, res) {
	
});

app.get('/u', function(req, res) {
		res.render('u',{
		title: '??',
		});
});

app.get('/u/:name', function(req, res) {
		res.render('u',{
		title: '??',
		});
});

app.post('/u/:name', function(req, res) {
	
});

app.get('/p/:id', function(req, res) { 
	res.render('p',{
		title: 'Create Post',
		});
});

app.post('/p/submit', function(req, res) {
Post.find({}, function(err,docs){   
	var address = stripPunct(req.body.title.toLowerCase()),
    collisions = 0;
    docs.map(function(doc) {
		collisions += (stripPunct(doc.title.toLowerCase()) == address ? 1 : 0);
	}).length;
	
	var post = new Post({
		title: req.body.title;
		lang: req.body.lang;
		tr_title:
		owner: [req.user._id];
		//date:    defaults	
		content: req.body.content;
		tr_content:
		//subs: []; defaults
		//karma: 0; defaults
	}); 	
	post.save(function(err,docs){
		if(err){
			console.log(err);
		}
		res.redirect(''); //redirect somewhere.
	});
});

app.post('/p/:id/comment',( function(req, res) {

	var comment = new Comment({
	owner: 		[req.user._id];
	thread: 	
	parent: 	
	local_id: 	
	//date:    defaults
	lang: 		req.body.lang;,
	content: 	rqe.body.content;
	tr_content: 
	//karma: 		0; defaults
	}); 	
	comment.save(function(err,docs){
		if(err){
			console.log(err);
		}
		res.redirect(''); //redirect somewhere.
	});
});

app.post('/k/:post', function(req, res) {

});

app.post('/k/:post/:comment', function(req, res) {
	
});

app.post('/n/:user', function(req, res) { //nominate
User.find({}, function(err,docs){   
	var address = stripPunct(req.body.title.toLowerCase()),
    collisions = 0;
    docs.map(function(doc) {
		collisions += (stripPunct(doc.title.toLowerCase()) == address ? 1 : 0);
	}).length;

	var user = new User({
		name:	req.body.name;
		organization: 	req.body.organization;
		//langs: 		[String]
		//view_langs:	[String] 	
		site:			req.body.site;			
		blurb: 			req.body.blurb;
		//joined: 		{ type: Date, default: Date.now }, 
		//subs: 			[String],
		email: 			req.body.email;
		//image: 			String, //fix
		//karma: 			{ type: Integer, default: 0 },
		upvoted:		[];
		saved:			[];
		//nominations: 	{},
		nominated:		[];
		connections: 	[];
		messages:		[];
	});
	
	user.save(function(err,docs){
		if(err){
			console.log(err);
		}
		res.redirect(''); //redirect somewhere.
	});
});

app.get('/m/:id', function(req, res) {
	res.render('m',{
		title: 'Message',
		});	
});

app.post('/m/send', function(req, res) {
	var message = new Message({
	sender: 	[req.user._id];
	recipient: 	req.body.recipient;
	content:	req.body.content;
	//date:  defaults
	});
	
	message.save(function(err,docs){
		if(err){
			console.log(err);
		}
		res.redirect(''); //redirect somewhere.
	});
		
});

app.listen(process.env.PORT || process.argv[2] || 8000);
