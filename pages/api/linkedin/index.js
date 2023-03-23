import { executeQuery } from '@/server/conn/conn';
const express = require('express');
const app = express();
const session = require('express-session');
import passport from 'passport';
import '../../../server/utils/passport'

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
 

export default async function (req,res, next){
  passport.authenticate('linkedin', { state: 'SOME STATE' })(req,res, next);
}
