const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requireRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requireRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Database connection success");
    app.listen(3000, () => {
      console.log("SERVER RUNNING");
    });
  })
  .catch(() => {
    console.log("Database cannot be connected");
  });
