import express from "express";
import User from "../models/user";
import Transaction from "../models/transaction";
import passport from "passport";
import jwt from "jsonwebtoken";
import config from "../config/database";
import Promise from "bluebird";
import isEmpty from "lodash/isEmpty";
import commonValidations from "../validations/signup";

const router = express.Router();

function validateUnique(data, otherValidation) {
  let { errors } = otherValidation(data);

  return Promise.all([
    /*  Returning the promise */
    User.getUserByUsername(data.username, function(err, user) {
      if (err) throw err;

      if (user) {
        if (user.username === data.username) {
          errors.username = "this username is already taken";
        }
      }
    }),

    User.getUserByEmail(data.email, function(err, user) {
      if (err) throw err;

      if (user) {
        if (user.email === data.email) {
          errors.email = "this email is already taken";
        }
      }
    })
  ]).then(() => {
    return {
      errors,
      isValid: isEmpty(errors)
    };
  });
}

// register route
router.post("/register", function(req, res) {
  // timeout for the loading screen thing

  validateUnique(
    req.body,
    commonValidations.validateInput
  ).then(({ errors, isValid }) => {
    if (isValid) {
      // we actually add the user to the database
      //create a new user
      let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        passwordConfirmation: req.body.passwordConfirmation
      });
      // add a check if username and email already exists and throw that erro
      // add function user
      User.addUser(newUser, function(err, user) {
        if (err) {
          res.status(400).json(errors);
        } else {
          res.json({ success: true });
        }
      });
    } else {
      res.json({ errors });
    }
  }); // returns isValid and errors
});

// authentication route
router.post("/authenticate", function(req, res) {
  const { username, password } = req.body;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ errors: { username: "user not found" } });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            creditCard: user.creditCard,
            balance: user.balance
          }
        });
      } else {
        return res.json({ errors: { password: "wrong password " } });
      }
    });
  });
});

// profile route USER JWT in front of the tokens, otherwise it won't be able to decode it
router.get(
  "/profile/:page",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    var userCard = req.user.creditCard;
    var page = req.params.page;
    Transaction.paginate(
      Transaction.find({
        $or: [{ senderCard: userCard }, { receiverCard: userCard }]
      }).sort("-date"),
      { page: page, limit: 20 },
      (err, transactions) => {
        return res.json({ user: req.user, transactions: transactions });
      }
    );
  }
);

router.get(
  "/AllTransactions",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var userCard = req.user.creditCard;
    Transaction.getTransactionsOfCard(userCard, (err, transactions) => {
      if (err) {
        console.log("couldn't fetch the transactions ");
      } else {
        return res.json({ transactions: transactions });
      }
    });
  }
);

router.put("/transfer", function(req, res) {
  // sender and receiver are card numbers
  var sender = req.body.sender;
  var receiver = req.body.receiver;
  var amount = req.body.amount;

  User.getUserByCard(sender, (err, sender) => {
    if (err) {
      return res.sendStatus(400);
    }
    if (!sender) {
      return res.json({ errors: { username: "user not found" } });
    }

    // check if the sender is in the range of 0 or more and that the transaction is less than his actual balance
    // we got a valid sender at  this point
    if (sender.balance >= 0 && sender.balance >= amount) {
      User.getUserByCard(receiver, (err, receiver) => {
        if (err) {
          return res.sendStatus(400);
        }
        if (!receiver) {
          return res.json({ errors: { username: "user not found" } });
        }

        // we found both the sender and the receiver info are here
        // we have sender + receiver + amount here
        var newTransaction = new Transaction({
          senderCard: sender.creditCard, // sender and receiver are cards here
          receiverCard: receiver.creditCard,
          transactionBalance: amount
        });

        Transaction.AddTransaction(newTransaction, function(err, transaction) {
          if (err) {
            console.log("transaction was not registered, something went buggy");
          } else {
            console.log(
              "transaction was successfully registered on the database"
            );
          }
        });

        var newSenderBalance = sender.balance - parseFloat(amount);
        var newReceiverBalance =
          parseFloat(receiver.balance) + parseFloat(amount);
        User.update(
          { _id: sender._id },
          { $set: { balance: newSenderBalance } },
          function(err, nbRows, raw) {
            if (err) {
              console.log("go die");
              return res.sendStatus(400);
            } else {
              console.log("the sender lost his money");
            }
          }
        );

        User.update(
          { _id: receiver._id },
          { $set: { balance: newReceiverBalance } },
          function(err, nbRows, raw) {
            if (err) {
              console.log("go die twice");
              return res.sendStatus(400);
            } else {
              console.log("transaction was successfull");
            }
          }
        );

        return res.json({
          transaction: { newBalanceSender: newSenderBalance }
        });
      });
    } else {
      return res.json({ msg: "not enough funds to do this transaction :( " });
    }
  });
});

router.put("/updatebalance", function(req, res) {
  var user = req.body;
  var amount = req.body.amount;
  if (user == null || user._id == null) {
    return res.sendStatus(400);
  } else {
    User.getUserById(user._id, (err, user) => {
      if (err) {
        return res.sendStatus(400);
      }
      var newBalance = user.balance + amount;
      User.update(
        { _id: user._id },
        { $set: { balance: newBalance } },
        function(err, nbRows, raw) {
          if (err) {
            console.log("couldnt find it ");
            return res.sendStatus(400);
          } else {
            return res.json({
              success: true,
              msg: "Transaction completed",
              user: {
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                creditCard: user.creditCard,
                balance: newBalance
              }
            });
          }
        }
      );
    });
  }
});

module.exports = router;
