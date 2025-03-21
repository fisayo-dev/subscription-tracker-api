import express from 'express';
import cookieParser from 'cookie-parser';

import { PORT } from './config/env.js';

// Routes
import {
  userRouter, authRouter, subscriptionRouter, workflowRouter
} from './routes/index.js' 
// Database
import connectToDatabase from './database/mongodb.js'
// Middleware
import { errorMiddleware, arcjetMiddleware } from './middlewares/index.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/workflows', workflowRouter);

app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.send('Welcome to the Subscription Tracker API!');
});

app.listen(PORT, async () => {
  console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);

  await connectToDatabase();
});

export default app;