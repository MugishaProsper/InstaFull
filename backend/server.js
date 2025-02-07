import express from 'express';
import { connectionToDatabase } from './config/db.config.js';
import router from './routes/auth.routes.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path'
import messageRoutes from './routes/messages.routes.js';
import userRoutes from './routes/user.routes.js';
import CORS from 'cors'
import kycRoutes from './routes/kyc.routes.js';
import consultationRoutes from './routes/consultation.routes.js';
import appointmentRoutes from './routes/appointment.routes.js';

dotenv.config();

const __dirname = path.resolve();

const app = express();
const port = process.env.port || 5000

app.use(express.json());
app.use(cookieParser());
app.use(CORS())

app.post('/api', (req, res) => {
  res.send('Server connected successfully')
})
app.use('/api/auth', router);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);
app.use('/api/kyc', kycRoutes);
app.use('/api/services', consultationRoutes, appointmentRoutes);

//app.use(express.static(path.join(__dirname, '/frontend/dist')));

//app.get('*', (req, res) => {
  //res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
//})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  connectionToDatabase();
})