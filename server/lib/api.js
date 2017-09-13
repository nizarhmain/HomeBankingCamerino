import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cors from 'cors'
import passport from 'passport'
import mongoose from 'mongoose'
import config from './config/database'
import generator from './finance/CreditCardGenerator'
import socket from 'socket.io'
import User from './models/user'



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
var server = app.listen((port), () => {
    console.log("server started on port : " + port);
  });

  
  

// Socket setup
var serverSocket = socket(server);
serverSocket.listen(5000);
console.log('websocket listening on port :', 5000);


var utilisateurs = {};


serverSocket.of('/chat_infra').on('connection', (client) => {
    
         client.on('infoReq', (data) => {
             console.log(data.creditCard + " connected with ", client.id);

             if( data.creditCard in utilisateurs) {
             } else {
                 client.nickname = data.creditCard;
                 utilisateurs[client.nickname] = client;
                // console.log(client.nickname);
                  //   console.log(utilisateurs[data.username].id);
             }
            
         });   

         // what happens is that a generic client, let's say ha1 whispers to tsu4
         // ha1 looks for tsu4 in the array called utilisateurs ( online users) , if he finds it, he doesn't technically emits and event to him 
         //  he makes him fire and event to himself, which means tsu4 will emit a "whisper" event to his own client and will display it 
         client.on('send message', (data) => {
                 var name = data.name;
                 var msg = data.msg;    
                     if(name in utilisateurs ) {
                         utilisateurs[name].emit('whisper', {msg: msg, from: client.nickname});
                     }
             
         });

         client.on('disconnect', () =>  {
             console.log(client.nickname +  " disconnected");
             if(!client.nickname) return;
             delete utilisateurs[client.nickname];
            
         });

});


/*
User.getUserById(user._id, (err, user) => {
  if(err) {
      return res.sendStatus(400);
  }
  var newBalance = user.balance + amount;
  User.update({_id: user._id}, { $set : { balance: newBalance}}, function(err,nbRows, raw){
      if(err){
          console.log("couldnt find it ")        
              return res.sendStatus(400);
          } else {
              return res.json({success: true, msg: 'Transaction completed', user: { _id: user._id, name: user.name, username: user.username, email: user.email, creditCard: user.creditCard,
                  balance: newBalance }
              });
          }
      });
})
*/