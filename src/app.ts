import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import userRoutes from './routes/user.route';
import exerciseRouter from './routes/exercise.route';
import workoutPlanRoutes from './routes/workoutPlan.route';

const app = express();
const PORT = 3000;
const MONGO_URI = 'mongodb+srv://MIIITester:HzTCidpMlOSXDVQ4@bloodyint.vnsgnuk.mongodb.net/?retryWrites=true&w=majority&appName=BloodyInt';
const JWT_SECRET = 'super-secret-key';

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());


app.use('/api/users', userRoutes);
app.use('/api/exercise', exerciseRouter);
app.use('/api/workoutPlan', workoutPlanRoutes);

app.use(express.static(path.join(__dirname, '../public')));

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

export const JWT_SECRET_KEY = JWT_SECRET;
export default app;