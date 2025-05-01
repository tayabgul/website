const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');
const customOrderRoutes = require('./routes/customOrderRoutes');
const notificationRoutes = require('./routes/notificationRoutes'); // Ensure correct import

const userRoutes = require('./routes/userroutes');
const chatRoutes = require('./routes/chatRoutes');
const productRoutes = require('./routes/productroutes');
const orderRoutes = require('./routes/orderRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const uploadRoutes = require("./routes/uploadRoutes");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

//  Connect to MongoDB
connectDB()
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(' MongoDB connection failed:', err.message));

//  Middleware
app.use(express.json());
app.use(cors());

//  API Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/supplier', supplierRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/chat', chatRoutes);
app.use("/api/upload", uploadRoutes);
app.use('/api/orders', customOrderRoutes);
app.use('/api/notifications', notificationRoutes); // Ensure correct route


//  Error Handling Middleware
app.use(errorHandler);

//  WebSockets for Real-time Chat
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("sendMessage", async ({ senderId, receiverId, message }) => {
    const newMessage = { senderId, receiverId, message, timestamp: new Date() };
    
    io.emit("receiveMessage", newMessage); // Broadcast message to all clients
  });

  socket.on("disconnect", () => {
    console.log(" User disconnected:", socket.id);
  });
});

//  Start Server
const port = process.env.PORT || 5006;
server.listen(port, '0.0.0.0', () => {
  console.log(` Server running on port ${port}`);
});