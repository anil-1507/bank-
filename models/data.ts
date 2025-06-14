import mongoose from 'mongoose';

const BankSchema = new mongoose.Schema({
    bankAccount: String,
    ifsc: String,
    holderName: String,
    bankName: String,
    city: String,
    branch: String
}, { timestamps: true });

const Bank = mongoose.model('Bank', BankSchema);
export default Bank;
