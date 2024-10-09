import express from 'express';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import path from 'path';

import todoRouter from './routes/todoRoutes/index.js';
import userRouter from './routes/userRoutes/index.js';

import { errorHandler, authenticate, logger } from './middlewares/index.js';
import mongoose from 'mongoose';

const port = process.env.PORT;
const app = express();

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(logger());
// Static Middleware
app.use(express.static(path.join(__dirname, 'public')));

// View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/api/user', userRouter);

app.use(authenticate);
app.use('/api/todo', todoRouter);

mongoose
  .connect(process.env.CONNSTRING)
  .then((client) => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => new Error(error));
app.use(errorHandler);
app.listen(port, () => logger.info(`Running In http://localhost:${port}`));
