import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import productRoute from './routes/productRoute';
import corsOptions from './config/corsOptions';
import logger from './utils/logger';

const app: Application = express();

app.use(cors(corsOptions));
app.use(express.json());

// Morgan setup to use Winston for HTTP request logging
app.use(
  morgan('combined', {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  }),
);

app.use('/api', productRoute);

export default app;
