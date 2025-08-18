import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware (Exactly what you requested)
app.use(helmet());
app.use(cors({ 
  origin: process.env.FRONTEND_URL 
}));
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));

// Your Existing Routes Below
// app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Secure server running on port ${PORT}`);
});