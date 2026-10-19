import "dotenv/config";
import express from "express";
import { SERVER_START_MESSAGE} from "./constants.js";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import messageRouter from "./routes/message.route.js";
import { app, server } from "./socket/socket.js";
import { CLIENT_URL } from "./settings.js";

const port = process.env.PORT;


// app.use(
//   cors({
//     origin: `${FRONTEND_URL}`,
//     credentials: true,
//   })
// );



const normalizeOrigin = (url) => {
  if (!url) return null;
  try {
    const { origin } = new URL(url);
    return origin;
  } catch {
    return url.replace(/\/$/, "");
  }
};

const allowedOrigins = [
  normalizeOrigin(CLIENT_URL),
  "http://localhost:5173",
  "http://127.0.0.1:5173",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS blocked origin: ${origin}`));
    },
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

    app.get("/", (req, res) => {
      res.status(200).json({
        success: true,
        message: "Chat backend is running 🚀",
      });
    });
  
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