import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connectDB from './config/db';
import bankRoutes from './routes/route';

dotenv.config();
const app = express();

// Middleware
app.use(bodyParser.json());

// Database Connection
connectDB();

// Routes
app.use('/api/bank', bankRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
