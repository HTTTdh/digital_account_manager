const express = require("express");
const tai_khoanRouter = require('./routers/tai_khoan.js');
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();

const listApi = ['http://localhost:3000', 'http://localhost:3001'];
const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true 
};

app.use('/api/account', tai_khoanRouter);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
})

