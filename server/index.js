const express = require('express');
const { PORT, MONGODB_URI } = require('./config.js');
const mongoose = require('mongoose');
const authRouter = require('./router/auth-router.js');
const roomController = require('./router/room-router.js');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const roomSocket = require('./sockets/roomSocket');
var jwt = require('jsonwebtoken');
require('dotenv').config()

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
    credentials: true,
  },
});
app.use(express.json());

//JWT Authentication

app.post('/jwt', async(request, response) => {
  const user = request.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1hr'
  })
  response.send({token});
});


// MIDDLEWARE
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credential: true,
};

app.use(cors(corsOptions));
app.use("/api/auth", authRouter);
app.use('/rooms', roomController);

app.get('/', (request, response) => {
  return response.status(200).json('Welcome to Apna Virtual Classroom :)');
});

io.on('connection', (socket) => {
  roomSocket(socket, io);
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

// Add this section for video conferencing
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    io.to(roomId).emit('user-connected', socket.id);

    socket.on('disconnect', () => {
      io.to(roomId).emit('user-disconnected', socket.id);
    });
  });

  socket.on('offer', (offer, userId, roomId) => {
    io.to(userId).emit('incoming-offer', offer, socket.id, roomId);
  });

  socket.on('answer', (answer, userId, roomId) => {
    io.to(userId).emit('incoming-answer', answer, socket.id, roomId);
  });

  socket.on('ice-candidate', (candidate, userId, roomId) => {
    io.to(userId).emit('incoming-ice-candidate', candidate, socket.id, roomId);
  });
});
