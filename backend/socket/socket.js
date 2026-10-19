import http from "http";
import express from "express";
import { Server } from "socket.io";
import "dotenv/config";

const app = express();

const server = http.createServer(app);

const normalizeOrigin = (url) => {
  if (!url) return null;
  try {
    return new URL(url).origin;
  } catch {
    return url.replace(/\/$/, "");
  }
};

const allowedOrigins = [
  normalizeOrigin(process.env.CLIENT_URL),
  "http://localhost:5173",
  "http://127.0.0.1:5173",
].filter(Boolean);

if (!process.env.CLIENT_URL) {
  console.warn("⚠️ CLIENT_URL env var is NOT set — production frontend will fail CORS!");
}

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {};

export const getReceiverSocketId = (receiver) => {
  return userSocketMap[receiver];
};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId !== undefined) {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    if (userId !== undefined) {
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
  });
});

export { app, server, io };







// import http from 'http'
// import express from 'express'
// import { Server } from 'socket.io'
// import "dotenv/config";
// let app = express()

// const server = http.createServer(app)
// const io = new Server(server,{
//     cors:({
//     origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
//   }),

// })

// const userSocketMap = {}
// export const getReceiverSocketId = (receiver) => {
//     return userSocketMap[receiver]
// }
// io.on("connection",(socket)=>{

//     const userId = socket.handshake.query.userId

//     if (userId !=undefined) {
//         userSocketMap[userId] = socket.id
//     }

//     io.emit("getOnlineUsers", Object.keys(userSocketMap))


//     socket.on("disconnect",()=>{
//         delete userSocketMap[userId]
//         io.emit("getOnlineUsers", Object.keys(userSocketMap))

//     })


// })



// export {app, server, io}