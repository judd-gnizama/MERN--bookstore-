import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js'

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get('/', (request, response) => {
  response.status(234).send('Hello this is a response')
  return response
});

app.use('/books', booksRoute); //for every route that starts with /books, use this middleware

// Middleware for handling CORS Policy
// Option 1: Allow All Origins with Default
// app.use(cors());
// Option 2: Allow Custom Origins (preferred)
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

mongoose
.connect(mongoDBURL)
.then(()=>{
  console.log('App connected to database');
  app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`)
  })
})
.catch((error) => {
  console.log(error)
});