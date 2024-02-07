const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const mongoose = require('mongoose');
const dotenv = require("dotenv");
const { PORT, MONGODB_URI } = require('./config.js');
const authRouter = require('./router/auth-router.js');
const roomController = require('./router/room-router.js');
const cors = require('cors');
var jwt = require('jsonwebtoken');
const groupVideoCallSocket = require("./socket/groupVideoCall");


// config for dotenv
dotenv.config()




const corsOptions = {
  origin: 'http://localhost:5173',
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credential: true,
};

app.use(cors(corsOptions));

app.use(express.json());

//routes
app.get("/", (req, res) => res.send("Welcome to Apna Virtual Classroom :)"));
app.use("/api/auth", authRouter);
app.use('/rooms', roomController);


//JWT Authentication

app.post('/jwt', async (request, response) => {
  try {
    const user = request.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '10hr'
    });
    response.send({ token });
    console.log("TOKKEN", token);
  } catch (error) {
    console.error("Error creating JWT token:", error.message);
    response.status(500).send({ error: 'Internal Server Error' });
  }
});





// Socket.io logic
groupVideoCallSocket(io);

// Port setup
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
})
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

