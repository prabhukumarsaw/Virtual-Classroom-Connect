import express from 'express'
import {PORT, MONGODB_URI} from './config.js'
import mongoose from 'mongoose';
import authRouter from './router/auth-router.js'
import cors from 'cors';

const app = express();
app.use(express.json());

//MIDDLEWARE//s
var corsOptions = {
    origin: 'http://localhost:5173',
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    Credential: true,
  }

app.use(cors(corsOptions));


app.use("/api/auth",authRouter);




















app.get('/', ((request, response) => {
    return response.status(200).json('Welcome to Apna Virtual Classroom :)')
}));

mongoose.connect(MONGODB_URI)
.then(() => {
    app.listen(PORT, (() => {
        console.log('App Connected to Database');
        console.log('====================================');
        console.log(`Server Started Port ${PORT}`)
    }));

}).catch((error) => {
    console.log(error);
});
  