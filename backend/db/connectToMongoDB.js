import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config(); 

const connectToMongoDB = 
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

export default connectToMongoDB;
