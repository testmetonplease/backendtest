import express from 'express';

import users from './users';
import blog from './blog';
import comments from './comments';

const router = express.Router();

router.use('/users', users);
router.use('/blog', blog);
router.use('/comments', comments);


export default router;
