import "dotenv/config";
import express from "express";
import { SERVER_START_MESSAGE } from "./constants.js";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const port = process.env.PORT || 5000;
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5176"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const start = async () => {
  try {
    // ✅ 1. connect DB FIRST
    await connectDb();


    const authRouter = (await import("./routes/auth.route.js")).default;
    const userRouter = (await import("./routes/user.routes.js")).default;

    app.use("/api/auth", authRouter);
    app.use("/api/user", userRouter);

  
    app.listen(port, (err) => {
      if (err) {
        console.log("server not started", err )

      }
      else {
      console.log(SERVER_START_MESSAGE);
    }
    });

  } catch (error) {
    console.error("❌ Server startup error:", error);
    process.exit(1);
  }
};

start();