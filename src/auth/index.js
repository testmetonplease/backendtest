import express from 'express';
import auth from './auth';

const authRoutes = express.Router();

authRoutes.use('/', auth);

export default authRoutes;
