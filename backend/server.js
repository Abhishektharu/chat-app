import express from 'express';
import authRoutes from './routes/authRoutes.js';
import connectToMongoDB from './db/connectToMongoDB.js';
import messageRoutes from './routes/messageRoutes.js'
import dotenv from 'dotenv';

dotenv.config(); 

const app = express();

// Middleware
app.use(express.json());  // For parsing JSON request bodies

// Use the auth routes
app.use('/api/auth', authRoutes);

// use the /message routes
app.use('/api/message', messageRoutes);
// Start the server
const PORT = process.env.PORT || 5000;

const uri = process.env.MONGO_URI;

app.listen(PORT, () => {
    console.log(uri);
    connectToMongoDB;
    console.log(`Server running on port ${PORT}`);
});
