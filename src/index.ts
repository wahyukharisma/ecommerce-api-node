import express, { json, urlencoded } from "express";
import procutsRouter from "./routes/products/index.js";
import authRouter from "./routes/auth/index.js";

const port = 3000;

const app = express();

app.use(urlencoded({ extended: false }));
app.use(json());

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/products', procutsRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})