import express from 'express';
import { verifyBankDetails } from '../controllers/controller';

const router = express.Router();

router.post('/verify', (req, res, next) => {
  Promise.resolve(verifyBankDetails(req, res)).catch(next);
});

export default router;
