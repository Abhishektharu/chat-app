import express from 'express';
import authRoutes from './routes/authRoutes.js';
import connectToMongoDB from './db/connectToMongoDB.js';

import dotenv from 'dotenv';

dotenv.config(); 

const app = express();

// Middleware
app.use(express.json());  // For parsing JSON request bodies

// Use the auth routes
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;

const uri = process.env.MONGO_URI;

app.listen(PORT, () => {
    console.log(uri);
    
    console.log(`Server running on port ${PORT}`);
});
