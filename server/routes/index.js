import express from 'express';
import user from './user';
import room from './room';

const router = express.Router();
router.use('/user', user);
router.use('/room', room);

export default router;
