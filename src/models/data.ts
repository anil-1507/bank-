import mongoose from 'mongoose';

const VerificationSchema = new mongoose.Schema({
  bankAccount: String,
  ifsc: String,
  name: String,
  phone: String,
  verifiedName: String,
  bankName: String,
  branch: String,
  city: String,
  status: String,
  verifiedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Verification', VerificationSchema);
