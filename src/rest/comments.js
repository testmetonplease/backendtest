// @flow

import {
  Router
} from 'express';
import Sequelize from 'sequelize';
import authHelpers from '../core/_helpers';
import relational from '../relational';

const router = Router();


// ------------------------- Separate line -------------------------

const whereRequest = (query) => {
  const find = {
    paranoid: false,
  };
  if (query && query.where) {
    const {
      articleId,
      text
    } = JSON.parse(query.where);
    if (author) {
      find.where = {
        articleId,
      };
    } else if (text) {
      find.where = {
        text: {
          [Sequelize.Op.like]: `%${text}%`,
        },
      };
    }
  }
  return find;
};


/**
 * @name Postgre
 */

/**
 * @name comments - get a comments
 * @param {string} [text] - search for text in comments
 * @return {Object<{ data: relational.comments[] }>}
 *
 * @example GET /api/comments
 
 */
router.get('/', async (req, res, next) => {
  try {
    const data = await relational.Comment.findAll(whereRequest(req.query));
    res.json({
      data,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @name count - get a comments length
 * @return {Object<{ data: number }>}
 *
 * @example GET /api/comments/count
 */
router.get('/count', async (req, res, next) => {
  try {
    const data = await relational.Comment.count(whereRequest(req.query));
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
 * @name create - create a item
 * @return {Object<{ message: string }>}
 *
 * @example POST /api/comments { text: ${text} }
 */
router.post('/', authHelpers.loginRequired, async (req, res, next) => {
  try {
    const pass = req.session.passport;
    const message = await relational.Comment
      .create({
        __v: req.body.__v,
        title: req.body.title,
        text: req.body.text,
        author: pass.user.id,
        parentId: req.body.parentId,
        articleId: req.body.articleId,
      })
      .then(() => 'comments saved');

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
    const message = await relational.Comment
      .update(
        {
          __v: req.body.__v,
          title: req.body.title,
          text: req.body.text,
          author: pass.user.id,
          parentId: req.body.parentId,
          articleId: req.body.articleId,
          status: req.body.status,
          updatedAt: req.body,
        }, {
          where: {
            _id: req.params.id,
          },
        },
      )
      .then(() => 'comment updated');

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
 * @example DELETE /api/comments/${id}
 */
router.delete('/:id', authHelpers.adminRequired, async (req, res, next) => {
  try {
    const message = await relational.Comment
      .destroy({
        where: {
          _id: req.params.id,
        },
        individualHooks: true,
      })
      .then(() => 'comment deleted');

    res.json({
      message,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
