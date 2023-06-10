const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const router = require("./router/index");
const uri = process.env.DB_URL;
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "https://jwt-auth-client-mu.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  handlePreflightRequest: (req, res) => {
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "https://jwt-auth-client-mu.vercel.app",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE",
      "Access-Control-Allow-Headers": "my-custom-header",
      "Access-Control-Allow-Credentials": true,
    });
    res.end();
  },
}));
app.use("/api", router);

const start = async () => {
  try {
    await mongoose.connect(uri);
    app.listen(PORT, () => console.log(`Server listened on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
