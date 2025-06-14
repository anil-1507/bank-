import { Request, Response } from 'express';
import fetch from 'node-fetch';
import Bank from '../models/data';

export const verifyBankDetails = async (req: Request, res: Response) => {
    const { bankAccount, ifsc } = req.body;
    
    try {
        const response = await fetch('https://sandbox.cashfree.com/verification/bank-account/async', {
            method: 'POST',
            headers: {
                'x-client-id': process.env.CLIENT_ID as string,
                'x-client-secret': process.env.CLIENT_SECRET as string,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bank_account: bankAccount, ifsc })
        });
        
        const data = await response.json() as {
            status: string;
            holder_name?: string;
            bank_name?: string;
            city?: string;
            branch?: string;
        };
        if (data.status === 'success') {
            const bankData = new Bank({
                bankAccount,
                ifsc,
                holderName: data.holder_name,
                bankName: data.bank_name,
                city: data.city,
                branch: data.branch
            });

            await bankData.save();
            return res.json(bankData);
        }

        res.status(400).json({ message: 'Verification failed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
