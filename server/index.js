import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import connectDB from './config/mongoDB.js';
import userRouter from "./routes/user.route.js";
import videoRouter from "./routes/video.route.js";
import playlistRouter from "./routes/playlist.route.js";
import commentRouter from "./routes/comment.route.js";
import subscriptionRouter from "./routes/subscription.route.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ✅ CORS setup
const allowedOrigins = [
  "http://localhost:5173", 
  "http://localhost:5000",  
   
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// ✅ API routes
app.use("/api/users", userRouter);
app.use("/api/videos", videoRouter);
app.use("/api/playlists", playlistRouter);
app.use("/api/comments", commentRouter);
app.use("/api/subscriptions", subscriptionRouter);

// ✅ Serve frontend (Vite build)
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/client/dist")));

app.get(/.*/, (_, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

// ✅ Start server
const PORT = process.env.PORt || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}!`);
});
