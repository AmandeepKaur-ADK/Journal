if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config
}
const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const router = express.Router();
const checkNotAuthenticated = require('./login');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const initializePassport = require('./passport-config');

initializePassport(
  passport, 
  email => User.find(user => user.email === email),
  id => User.find(user => user.id === id)

);
const { application } = require('express');

router.use(flash());
router.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
router.use(passport.initialize())
router.use(passport.session())

router.get('/signup',checkNotAuthenticated,(req, res)=>{
    res.render("signup");
  })
router.post('/signup',checkNotAuthenticated, async(req,res) =>{
    try {
      let hashedPassword = await bcrypt.hash(req.body.password, 10);
      let user = new User({
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      })
      // if(User.find.exists({name : req.body.name} || {email: req.body.email})){
      //   console.log('User Exists');
      // }
      // else{
        if(req.body.password === req.body.confirmpassword){
          user =  await user.save();
          res.status(200).redirect('/login');;
          console.log(user);
        }
        else{
          res.send('Password not match!');
        }
      // }
       
      
    }
    catch(err){
      res.status(400).redirect('/signup');
      console.log(err);
    }
   
  })

module.exports = router;