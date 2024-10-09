import express from 'express';
import { login } from '../../controller/userController/index.js';

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login');
});
router.post('/login', login);

export default router;
