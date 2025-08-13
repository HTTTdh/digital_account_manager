const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();

const authRoutes = require("./router/auth");
const adminRouter = require("./router/admin");
const { connectToDB } = require("./config/database.js"); 
const app = express();

// CORS options
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true
};



// app.use('/api/account', tai_khoanRouter);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/account", adminRouter);
app.use("/api/admin", adminRouter);
app.use("/api/auth", authRoutes);

// Start server
app.listen(3000, async () => {
  try {
    await connectToDB();
    console.log("Server running on port 3000");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
});

















// const authRoutes = require("./router/auth.js");
// const adminRouter = require("./router/admin.js");
// const app = express();
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
// require("dotenv").config();
// const listApi = ['http://localhost:3000', 'http://localhost:3001'];
// const corsOptions = {
//     origin: ['http://localhost:3000', 'http://localhost:3001'],
//     credentials: true 
// };
// app.use(cookieParser());
// app.use('/api/account', adminRouter);
// app.use(cors(corsOptions));
// app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use("/api/admin", adminRouter);
// app.use("/api/auth", authRoutes);


// app.listen(3000, async() => {
//     await connectToDB();
// })

