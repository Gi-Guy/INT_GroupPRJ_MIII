import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

import userRouter from './routes/user.route';
import exerciseRouter from './routes/exercise.route';

const app = express();
const PORT = 3000;
const MONGO_URI = 'mongodb+srv://MIIITester:HzTCidpMlOSXDVQ4@bloodyint.vnsgnuk.mongodb.net/?retryWrites=true&w=majority&appName=BloodyInt';

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('api/user', userRouter);
app.use('api/exercise', exerciseRouter);

app.use(express.static(path.join(__dirname, 'public')));mongoose.connect(MONGO_URI)
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});
export default app;