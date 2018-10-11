// @flow

import passport from 'passport';
import {
  Strategy as LocalStrategy,
} from 'passport-local';
import relational from '../relational';

import authHelpers from './_helpers';


passport.serializeUser((user, done) => {
  done(null, {
    id: user._id,
    firstname: user.firstname,
  });
});

passport.deserializeUser(async (pass, done) => {
  try {
    const user = await relational.User.find({ where: { _id: pass.id } });
    if (!user) {
      done('User not found', null);
    }
    done(null, user);
  } catch (e) {
    done(e, null);
  }
});

passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (username, password, done) => {
  // check to see if the username exists
  try {
    const user = await relational.User.find({
      where: {
        email: username,
      },
    });
    if (!user) return done(null, false);
    if (!authHelpers.comparePass(password, user.password)) {
      return done(null, false);
    }
    return done(null, user);
  } catch (e) {
    return done(e, null);
  }
}));

export default passport;
