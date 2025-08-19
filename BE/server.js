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
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
};

// app.use('/api/account', tai_khoanRouter);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/admin", adminRouter);
app.use("/api/auth", authRoutes);

// Start server
app.listen(8080, async () => {
  try {
    await connectToDB();
    console.log("Server running on port 8080");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
});
