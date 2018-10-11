import {
  Router,
} from 'express';
import authHelpers from '../core/_helpers';
import relational from '../relational';

const router = Router();

/**
 * @name users - get a users
 * @param {string} [text] - search for text in users
 * @return {Object<{ data: relational.users[] }>}
 *
 * @example GET /api/users
 * @example GET /api/users?text=${text}
 */
router.get('/', async (req, res, next) => {
  try {
    // TODO: get a item with ID
    const {
      body,
    } = req.query;

    const find = {};

    if (body) {
      // find.where = {
      //   body: {
      //     [Op.like]: `%${body}%`,
      //   },
      // };
    }

    const data = await relational.User.findAll(find);
    res.json({
      data,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/count', async (req, res, next) => {
  try {
    const data = await relational.User.count();
    res.json({
      data,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @name pagination - get a list of paging
 */
router.get('/pagination', (req, res, next) => {
  try {
    // TODO: pagination
  } catch (err) {
    next(err);
  }
});


/**
 * @name update - update a item
 */
router.put('/:id', authHelpers.loginRequired, async (req, res, next) => {
  try {
    const message = await relational.User
      .update({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        role: req.body.role,
        updatedAt: req.body,
      }, {
        where: {
          _id: req.params.id,
        },
      })
      .then(() => 'user updated');

    res.json({
      message,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @name delete - remove a item
 * @return {Object<{ message: string }>}
 *
 * @example DELETE /api/users/${id}
 */
router.delete('/:id', authHelpers.adminRequired, async (req, res, next) => {
  try {
    const message = await relational.User
      .destroy({
        where: {
          _id: req.params.id,
        },
      })
      .then(() => 'user deleted');

    res.json({
      message,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
