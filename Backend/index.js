import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import TestRoutes from './Routes/Test.Routes.js'
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
const port = process.env.PORT || 3100;
const url = process.env.MONGODB_URL
mongoose.connect(url)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error.message));
app.use('/test', TestRoutes); 
app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
