// index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const buyerRoutes = require('./routes/buyerRoutes');
const lorryRoutes = require('./routes/lorryRoutes'); 

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());            
app.use(express.json());

// Mount routes
app.use('/api', userRoutes);                // For /register, /login, etc.
app.use('/api/products', productRoutes);    // For product-related routes
app.use('/api/buyers', buyerRoutes);        // For buyer-related routes
app.use('/api/lorry', lorryRoutes);         // For lorry logistics routes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
