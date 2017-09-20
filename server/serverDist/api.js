"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _database = require("./config/database");

var _database2 = _interopRequireDefault(_database);

var _CreditCardGenerator = require("./finance/CreditCardGenerator");

var _CreditCardGenerator2 = _interopRequireDefault(_CreditCardGenerator);

var _socket = require("socket.io");

var _socket2 = _interopRequireDefault(_socket);

var _user = require("./models/user");

var _user2 = _interopRequireDefault(_user);

var _users = require("./routes/users");

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//connect to database
_mongoose2.default.Promise = require("bluebird");
_mongoose2.default.connect(_database2.default.database);

_mongoose2.default.connection.on("connected", function () {
  console.log("connected to the database" + _database2.default.database);
});

//on error connection
_mongoose2.default.connection.on("error", function (err) {
  console.log("connected to database" + err);
});

// initialize our app variable with express
var app = (0, _express2.default)();
var port = 3000;

//cors middleware
app.use((0, _cors2.default)());

//set static folder for the front end at the end of the distribution
// we'll need it later for deployment

app.use(_express2.default.static(_path2.default.join(__dirname, "public")));

//router
//body parser middleware
app.use(_bodyParser2.default.json());

//passport middleware
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());

require("./config/passport")(_passport2.default);

app.use("/users", _users2.default); // route handle for the users

// index route
app.get('/', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, 'public/index.html'));
});

app.get('*', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, 'public/index.html'));
});

//start server
var server = app.listen(port, function () {
  console.log("server started on port : " + port);
});

// Socket setup
var serverSocket = (0, _socket2.default)(server);
serverSocket.listen(5000);
console.log("websockets listening on port :", 5000);

var utilisateurs = {};

serverSocket.of("/chat_infra").on("connection", function (client) {
  client.on("infoReq", function (data) {
    console.log(data.creditCard + " connected with ", client.id);

    if (data.creditCard in utilisateurs) {} else {
      client.nickname = data.creditCard;
      utilisateurs[client.nickname] = client;
      // console.log(client.nickname);
      //   console.log(utilisateurs[data.username].id);
    }
  });

  // what happens is that a generic client, let's say ha1 whispers to tsu4
  // ha1 looks for tsu4 in the array called utilisateurs ( online users) , if he finds it, he doesn't technically emits and event to him
  //  he makes him fire and event to himself, which means tsu4 will emit a "whisper" event to his own client and will display it
  client.on("send message", function (data) {
    var name = data.name;
    var msg = data.msg;
    if (name in utilisateurs) {
      utilisateurs[name].emit("whisper", { msg: msg, from: client.nickname });
    }
  });

  client.on("disconnect", function () {
    console.log(client.nickname + " disconnected");
    if (!client.nickname) return;
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