const express = require("express");
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


const {connectToDB} = require("./config/database");



app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))



//Router
const adminRouter = require("./router/admin.js");



//Api
app.use("/api/admin", adminRouter);


app.listen(process.env.PORT, async() => {
    await connectToDB();
})