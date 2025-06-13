import express from 'express';
import { verifyBankDetails } from '../controllers/controller';

const router = express.Router();

router.post('/verify', verifyBankDetails);

export default router;
