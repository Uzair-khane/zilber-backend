const express = require('express');
const cors = require('cors');
const path = require('path'); // 1. Ye add karein (Built-in hota hai)
require('dotenv').config();

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Backend Server Running Successfully!');
});
// 2. Ye line images ko browser mein dikhane ke liye ZAROORI hai
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.use('/api/orders', orderRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server start on port ${PORT} `);
});