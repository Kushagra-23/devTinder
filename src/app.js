require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const http = require("http");

// Uncomment for scheduling cron job
// require("./utils/cronjob")

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requireRouter = require("./routes/request");
const userRouter = require("./routes/user");
const paymentRouter = require("./routes/payment");
const initializeSocket = require("./utils/socket");
const chatRouter = require("./routes/chat");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requireRouter);
app.use("/", userRouter);
app.use("/", paymentRouter);
app.use("/", chatRouter);

const server = http.createServer(app);

initializeSocket(server);

connectDB()
  .then(() => {
    console.log("Database connection success");
    server.listen(7777, () => {
      console.log("SERVER RUNNING");
    });
  })
  .catch(() => {
    console.log("Database cannot be connected");
  });
