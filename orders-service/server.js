const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const ordersRoutes = require('./routes/ordersRoutes');
  
 // Initialize the Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(express.json()); // Parses incoming JSON requests

// API Routes
app.use('/', ordersRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
 });
  
  