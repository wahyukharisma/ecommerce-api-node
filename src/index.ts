import express, { Router } from "express";
import procutsRouter from './routes/products/index';

const port = 3000;

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/products', procutsRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})