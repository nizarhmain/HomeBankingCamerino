import express from 'express'
import User from '../models/user'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import config from '../config/database'
import Promise from 'bluebird'
import isEmpty from 'lodash/isEmpty'
import commonValidations from '../validations/signup'

const router = express.Router();


function validateUnique(data, otherValidation){
    let { errors } = otherValidation(data);

    return Promise.all([
  /*  Returning the promise */
User.getUserByUsername(data.username, function(err, user){  
                if (err) throw err;

                if(user){
                        if(user.username === data.username){
                        errors.username = "this username is already taken";
                        }
                }
                
            }),

User.getUserByEmail(data.email, function(err, user){  
                if (err) throw err;

                if(user){
                        if(user.email === data.email){
                        errors.email = "this email is already taken";
                    }
                }
                
            })
        ]).then(() => {
            return { 
                errors,
                isValid : isEmpty(errors)
            };
        });
}


// register route
router.post('/register', function(req, res){                     
                                   
    // timeout for the loading screen thing
  

    validateUnique(req.body, commonValidations.validateInput).then(({errors, isValid}) => {
    if ( isValid ) {
           // we actually add the user to the database
                    //create a new user
                let newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password,
                    passwordConfirmation: req.body.passwordConfirmation,
                });
                // add a check if username and email already exists and throw that erro
                // add function user
                User.addUser(newUser, function(err, user){
                    if(err){
                       res.status(400).json(errors);
                    } else {
                        res.json({success: true });
                    }
                }); 
            } else {
                res.json({ errors });
            }
        
  });    // returns isValid and errors
    
});

// authentication route
router.post('/authenticate', function(req, res ){ 
    const {username, password} = req.body;
    
    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user) {
            return res.json({ errors: {username: 'user not found'} });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 // 1 week
             });
   
                res.json({
                    success: true,
                    token: token,
                    user: { id: user._id, name: user.name, username: user.username, email: user.email, creditCard: user.creditCard,
                            balance: user.balance
                    },
                })
            } else {
                return res.json({ errors: {password: 'wrong password '} });
            }
        });
    });

});

// profile route USER JWT in front of the tokens, otherwise it won't be able to decode it
router.get('/profile', passport.authenticate('jwt', {session: false}), function(req, res){
    res.json({user: req.user});
});

router.put('/updatebalance', function(req,res){
    console.log(req.body);
    var user = req.body;
    var amount = req.body.amount;
	if(user == null || user._id == null ){
		return res.sendStatus(400);
	} else {

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
                        return res.json({success: true, msg: 'Transaction completed'});
                    }
                });
        })

     
  }

});




module.exports = router;