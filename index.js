import express from 'express';

import router from './routes/todoRoutes/index.js';
import { errorHandler } from './middlewares/index.js';

const PORT = 3000;

const app = express();

app.use(express.json());

app.use('/api', router);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Running In http://localhost:${PORT}`));
