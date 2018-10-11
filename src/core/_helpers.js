
import bcrypt from 'bcryptjs';
import Sequelize from 'sequelize';
import relational from '../relational';

const comparePass = (userPassword, databasePassword) => bcrypt.compareSync(userPassword, databasePassword);

const createUser = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password, salt);
    const message = await relational.User
      .create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
      })
      .then(() => 'User created')
      .catch(Sequelize.ValidationError, err => err.errors[0].message);
    res.json({ message });
    next();
  } catch (err1) {
    next(err1);
  }
};

const loginRedirect = (req, res, next) => {
  if (req.user) {
    return res.status(401).json({
      status: 'You are already logged in',
    });
  }
  return next();
};

const uniqueEmail = async (value, next) => {
  try {
    await relational.User.find({
      where: {
        email: value,
      },
    })
      .then((user) => {
      // reject if a different user wants to use the same email
        if (user) {
          next('Email already in use!');
        }
        return next();
      })
      .catch(err => next(err));
  } catch (err) {
    console.log(err);
  }
};

const adminRequired = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      status: 'Please log in',
    });
  }
  return relational.User.find({ where: { _id: req.user._id } })
    .then((user) => {
      if (user.role.trim() !== 'ADMIN') {
        res.status(401).json({
          status: 'You are not authorized',
        });
        return false;
      }
      return next();
    })
    .catch(() => {
      res.status(500).json({
        status: 'Something bad happened',
      });
    });
};

const loginRequired = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ status: 'Please log in' });
    return false;
  }
  return next();
};


export default {
  comparePass,
  createUser,
  loginRedirect,
  loginRequired,
  adminRequired,
  uniqueEmail,
};
