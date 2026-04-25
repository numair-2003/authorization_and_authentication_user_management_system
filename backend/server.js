const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());                      
app.use(express.json());              

app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'MERN Backend API is running' });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern_users';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB!');
    app.listen(PORT, () =>
      console.log(`Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });