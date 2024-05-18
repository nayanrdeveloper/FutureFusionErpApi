import express, { Application } from 'express';
import cors from 'cors';
import productRoute from './routes/productRoute';
import corsOptions from './config/corsOptions';

const app: Application = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', productRoute);

export default app;
