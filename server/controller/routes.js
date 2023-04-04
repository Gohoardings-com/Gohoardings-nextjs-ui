
const app = express();
const passport = require('passport');
const session = require('express-session');
const catchError = require('../middelware/catchError');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;


app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET'
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

passport.use(new LinkedInStrategy({
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: process.env.callbackURL,
  scope: ["r_emailaddress", "r_liteprofile"],
}, (
    accessToken,
    refreshToken,
    profile,
    done
  ) => {
    process.nextTick(() => {
      return done(null, profile);
    });
}
));



app.get('/profile', isLoggedIn, function (req, res) {
  res.render('/', {
    user: req.user // get the user out of session and pass to template
  });
});


exports.linkedin =   catchError(passport.authenticate('linkedin', {
  state: "SOME STATE" 
}));

app.get('/',
  passport.authenticate('linkedin', {
    successRedirect: '/profile',
    failureRedirect: '/login'
  }));

router.get('/', function (req, res) {
  req.logout();
  res.redirect('/');
});


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}

module.exports = router;