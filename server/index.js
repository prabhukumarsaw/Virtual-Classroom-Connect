const express = require('express');
const { PORT, MONGODB_URI } = require('./config.js');
const mongoose = require('mongoose');
const authRouter = require('./router/auth-router.js');
const roomController = require('./router/room-router.js');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.json());

// MIDDLEWARE
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  Credential: true,
};

app.use(cors(corsOptions));
app.use("/api/auth", authRouter);
app.use('/rooms', roomController);

io.on('connection', (socket) => {
  // Joining a room
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    io.to(roomId).emit('user-joined', userId);
  });

  // Leaving a room
  socket.on('leave-room', (roomId, userId) => {
    socket.leave(roomId);
    io.to(roomId).emit('user-left', userId);
  });

  // Broadcasting messages
  socket.on('send-message', (roomId, message) => {
    io.to(roomId).emit('receive-message', message);
  });
});

app.get('/', (request, response) => {
  return response.status(200).json('Welcome to Apna Virtual Classroom :)');
});

mongoose.connect(MONGODB_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log('App Connected to Database');
      console.log('====================================');
      console.log(`Server Started Port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
