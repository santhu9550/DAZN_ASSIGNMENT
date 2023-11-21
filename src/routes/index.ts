import express from 'express';
import movieRouter from './movieRoute';

const router = express.Router();

router.use('/movies', movieRouter);

export default router;
