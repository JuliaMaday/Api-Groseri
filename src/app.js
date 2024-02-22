import express from 'express';
import morgan from 'morgan';
import { config } from 'dotenv';
import productsRouter from './routes/products.routes.js';
config();

const app = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(morgan('dev'));
app.use('/', productsRouter);


export default app;
