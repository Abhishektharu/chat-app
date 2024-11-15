import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectToMongoDB from "./db/connectToMongoDB.js";

import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoute from "./routes/userRoute.js";

import { app, server } from "./socket/socket.js";

//path
import path from "path";

dotenv.config();

// const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.get("/hello", (req, res) => {
  res.send("hello world");
});

// Middleware
app.use(express.json()); // For parsing JSON request bodies
app.use(cookieParser()); // to get the cookies from jwt

// Use the auth routes
app.use("/api/auth", authRoutes);
// use the user route
app.use("/api/users", userRoute);
// use the /message routes
app.use("/api/messages", messageRoutes);
// Start the server

app.use(express.static(path.join(__dirname, "frontend/dist")));

app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "frontend", "dist","index.html"));
})

server.listen(PORT, () => {
  connectToMongoDB;
  console.log(`Server running on port http://localhost:${PORT}`);
});
