import {
  Router,
} from 'express';
import passport from '../core/passport';
import authHelpers from '../core/_helpers';

const authRoutes = Router();

const handleResponse = (res, code, statusMsg) => {
  res.status(code).json({
    status: statusMsg,
  });
};


authRoutes.post('/register', (req, res, next) => authHelpers.createUser(req, res, next));

authRoutes.post('/login', authHelpers.loginRedirect, (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      handleResponse(res, 500, 'error');
    }
    if (!user) {
      handleResponse(res, 404, 'User not found');
    }
    if (user) {
      req.logIn(user, (err1) => {
        if (err1) {
          handleResponse(res, 500, 'error');
        }
        handleResponse(res, 200, 'success');
      });
    }
  })(req, res, next);
});


authRoutes.get('/logout', authHelpers.loginRequired, (req, res) => {
  req.logout();
  handleResponse(res, 200, 'success');
});

export default authRoutes;
