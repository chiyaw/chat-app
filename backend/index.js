import "dotenv/config";
import express from "express";
import { SERVER_START_MESSAGE } from "./constants.js";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import messageRouter from "./routes/message.route.js";
import { app, server } from "./socket/socket.js";

const port = process.env.PORT;


app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const start = async () => {
  try {
    await connectDb();


    const authRouter = (await import("./routes/auth.route.js")).default;
    const userRouter = (await import("./routes/user.routes.js")).default;

    app.use("/api/auth", authRouter);
    app.use("/api/user", userRouter);
    app.use("/api/message", messageRouter);

  
    server.listen(port, (err) => {
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