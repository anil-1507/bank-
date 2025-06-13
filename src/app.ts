import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import routes from './routes/route';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
connectDB();
app.use('/api/bank-verification', routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
export default app;