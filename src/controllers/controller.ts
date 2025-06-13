import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import Verification from '../models/data';

export const verifyBankDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { bank_account, ifsc, name, phone } = req.body;

  try {
    const response = await axios.post(
      process.env.CASHFREE_API_URL!,
      {
        bank_account,
        ifsc,
        name,
        phone
      },
      {
        headers: {
          'x-client-id': process.env.CASHFREE_CLIENT_ID!,
          'x-client-secret': process.env.CASHFREE_CLIENT_SECRET!,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = response.data;

    const saved = await Verification.create({
      bankAccount: bank_account,
      ifsc,
      name,
      phone,
      verifiedName: data?.data?.name,
      bankName: data?.data?.bank,
      branch: data?.data?.branch,
      city: data?.data?.city,
      status: data?.status,
    });

    res.status(200).json({
      message: 'Bank account verified',
      data: saved,
    });
  } catch (error: any) {
    console.error('Cashfree error:', error?.response?.data || error.message);
    res.status(500).json({
      message: 'Verification failed',
      error: error?.response?.data || error.message,
    });
  }
};
export const getVerificationStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    const verification = await Verification.findById(id);

    if (!verification) {
      res.status(404).json({ message: 'Verification not found' });
      return;
    }

    res.status(200).json({
      message: 'Verification status retrieved',
      data: verification,
    });
  } catch (error) {
    console.error('Error retrieving verification:', error);
    res.status(500).json({
      message: 'Error retrieving verification status',
      error: error.message,
    });
  }
};