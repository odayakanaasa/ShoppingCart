let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let expressHbs = require('express-handlebars');
let mongoose = require('mongoose');
let session = require('express-session');
let passport = require('passport');
let flash = require('connect-flash');
let validator = require('express-validator');
let MongoStore = require('connect-mongo')(session);

let routes = require('./routes/index');
let userRoutes = require('./routes/user');

let app = express();
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:admin@ds251807.mlab.com:51807/weppo-shop', { useMongoClient: true });
require('./config/passport');

app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
  secret: 'mysupersecret', 
  resave: false, 
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 180 * 60 * 1000 }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
});

app.use('/user', userRoutes);
app.use('/', routes);

app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;