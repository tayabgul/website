const mongoose = require('mongoose');
const Product = require('../models/product'); // Assuming you have a product model
require('dotenv').config(); // To load MongoDB connection string from .env

// MongoDB URI from .env or directly
const mongoUri = process.env.MONGO_URI || 'your_mongo_connection_string';

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error', err);
  });

// Hardcoded product data
const products = [
  {
    name: 'Sample Product 1',
    category: 'Category 1',
    description: 'A sample product description.',
    price: 99.99,
    stock: 10,
  },
  {
    name: 'Sample Product 2',
    category: 'Category 2',
    description: 'Another product description.',
    price: 149.99,
    stock: 5,
  },
  {
    name: 'Sample Product 3',
    category: 'Category 3',
    description: 'Yet another sample description.',
    price: 199.99,
    stock: 3,
  },
];

// Insert the products into MongoDB
async function insertProducts() {
  try {
    await Product.deleteMany(); // Optional: clear the collection before inserting
    await Product.insertMany(products);
    console.log('Products inserted successfully');
    mongoose.connection.close(); // Close the connection after insertion
  } catch (err) {
    console.error('Error inserting products:', err);
    mongoose.connection.close(); // Close connection in case of error
  }
}

// Run the function to insert products
insertProducts();
