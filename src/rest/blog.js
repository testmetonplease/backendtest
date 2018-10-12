// @flow


import {
  Router,
} from 'express';
import Sequelize from 'sequelize';
import authHelpers from '../core/_helpers';
import relational from '../relational';


const router = Router();

const whereRequest = (query) => {
  const find = {
    paranoid: false,
  };
  if (query && query.where) {
    const { author, body } = JSON.parse(query.where);
    if (author) {
      find.where = {
        author,
      };
    } else if (body) {
      find.where = {
        body: {
          [Sequelize.Op.like]: `%${body}%`,
        },
      };
    }
  }
  return find;
};


// ------------------------- Separate line -------------------------

/**
 * @name Postgre
 */

/**
 * @name blog - get a blog
 * @param {string} [text] - search for text in blog
 * @return {Object<{ data: relational.Blog[] }>}
 *
 * @example GET /api/blog
  */
router.get('/', async (req, res, next) => {
  try {
    const data = await relational.Blog.findAll(whereRequest(req.query))
      .catch(() => res.status(401).json({
        status: 'SequelizeDatabaseError',
      }));
    res.json({
      data,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @name count - get a blog length
 * @return {Object<{ data: number }>}
 *
 * @example GET /api/blog/count
 */
router.get('/count', async (req, res, next) => {
  try {
    const data = await relational.Blog.count(whereRequest(req.query))
      .catch(() => res.status(401).json({ status: 'SequelizeDatabaseError' }));
    res.json({
      data,
    });
  } catch (err) {
    next(err);
  }
});


/**
 * @example GET /api/blog
 * @example GET /api/blog/:id
 */
router.get('/:id', async (req, res, next) => {
  try {
    const find = {
      paranoid: false,
      where: {
        _id: req.params.id,
      },
    };
    await relational.Blog.find(find)
      .then((data) => {
        if (data && data.dataValues) {
          if (data.dataValues.status.trim() === 'deleted') {
            res.status(404).json({
              status: 'Page not found!',
            });
          } else {
            res.json({
              data,
            });
          }
        } else {
          res.status(404).json({
            status: 'Page not found!',
          });
        }
      })
      .catch(() => res.status(401).json({ status: 'Real Error!' }));
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
 * @name create - create a item
 * @return {Object<{ message: string }>}
 *
 * @example POST /api/blog { data: ${data} }
 */
router.post('/', authHelpers.loginRequired, async (req, res, next) => {
  try {
    const pass = req.session.passport;
    const message = await relational.Blog
      .create({
        __v: req.body.__v,
        title: req.body.title,
        metaTitle: req.body.metaTitle,
        metaDescription: req.body.metaDescription,
        metaKeywords: req.body.metaKeywords,
        body: req.body.body,
        authorName: pass.user.firstname,
        author: pass.user.id,
      })
      .then(() => 'Blog saved');

    res.json({
      message,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @name update - update a item
 */
router.put('/:id', authHelpers.loginRequired, async (req, res, next) => {
  try {
    const pass = req.session.passport;
    const message = await relational.Blog
      .update(
        {
          __v: req.body.__v,
          title: req.body.title,
          metaTitle: req.body.metaTitle,
          metaDescription: req.body.metaDescription,
          metaKeywords: req.body.metaKeywords,
          body: req.body.body,
          authorName: pass.user.firstname,
          author: pass.user.id,
          status: req.body.status,
          updatedAt: req.body,
        }, {
          where: {
            _id: req.params.id,
          },
        },
      )
      .then(() => 'Blog updated');

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
 * @example DELETE /api/blog/${id}
 */
router.delete('/:id', authHelpers.adminRequired, async (req, res, next) => {
  try {
    const message = await relational.Blog
      .destroy({
        where: {
          _id: req.params.id,
        },
        individualHooks: true,
      })
      .then(() => 'Blog deleted');

    res.json({
      message,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
