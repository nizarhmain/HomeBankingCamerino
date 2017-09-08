import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cors from 'cors'
import passport from 'passport'
import mongoose from 'mongoose'
import config from './config/database'
import generator from './finance/CreditCardGenerator'


//connect to database
mongoose.Promise = require('bluebird');
mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
  console.log('connected to the database' + config.database);
})

//on error connection 
mongoose.connection.on('error', (err) => {
  console.log('connected to database' + err);
})


// initialize our app variable with express
const app = express();
const port = 3000;

import users from './routes/users'

//cors middleware
app.use(cors());

//set static folder for the front end at the end of the distribution
// we'll need it later for deployment

app.use(express.static(path.join(__dirname, 'public')));

//router
//body parser middleware
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users); // route handle for the users


//start server
app.listen((port), () => {
    console.log("server started on port : " + port);
  })