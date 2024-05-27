import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';
import corsOptions from './config/corsOptions';
import logger from './utils/logger';
import { notFoundHandler } from './middlewares/notFoundHandler';
import { errorHandler } from './middlewares/errorHandler';

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

app.use('/api', routes);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
