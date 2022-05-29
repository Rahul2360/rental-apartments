const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
var mongoDatabase = 'mongodb://localhost:27017/apartment-rental';

const app = express();
mongoose.Promise = global.Promise;
// Connect Mongodb Database
mongoose.connect(mongoDatabase, { useNewUrlParser: true }).then(
  () => { console.log('Database is connected') },
  err => { console.log('There is problem while connecting database ' + err) }
);

// All the express routes
const userRoutes = require('./userRoutes');
const apartmentRoutes = require('./apartmentRoutes')

app.use(bodyParser.json());

// Enabled CORS
app.use(cors());

// Setup for the server port number
const port = process.env.PORT || 5021;

// Routes Configuration
app.use('/user', userRoutes);
app.use('/apartment', apartmentRoutes);

// Staring our express server
const server = app.listen(port,() => console.log(`server running at port: ${port}`));
