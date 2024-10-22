import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import connectToMongoDB from './db/connectToMongoDB.js';

import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js'

import cors from 'cors';

dotenv.config(); 


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/hello", (req, res)=>{
    res.send("hello world");
})
// Middleware
app.use(express.json());  // For parsing JSON request bodies
app.use(cookieParser()); // to get the cookies from jwt

// Use the auth routes
app.use('/api/auth', authRoutes);

// use the /message routes
app.use('/api/messages', messageRoutes);
// Start the server


app.listen(PORT, () => {
    connectToMongoDB;
    console.log(`Server running on port http://localhost:${PORT}`);
});
