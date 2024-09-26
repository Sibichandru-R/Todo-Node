import express from 'express';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import todoRouter from './routes/todoRoutes/index.js';
import userRouter from './routes/userRoutes/index.js';

import { errorHandler, authenticate } from './middlewares/index.js';

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/todo', authenticate, todoRouter);
app.use('/api/user', userRouter);

app.use(errorHandler);
app.use(authenticate);
app.listen(port, () => console.log(`Running In http://localhost:${port}`));
