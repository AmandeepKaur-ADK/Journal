if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config
}
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const dotenv = require('dotenv').config();
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



router.get("/login", checkNotAuthenticated,(req, res)=>{
    res.render("login");
  })
 
  router.post('/login',checkNotAuthenticated , passport.authenticate('local', {
    successRedirect: '/journal/index',
    failureRedirect: '/login',
    failureFlash: true
  }))

  function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect('/login')
  }

  function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
      redirect('/login');
    }
    next();
  }
module.exports = router;
module.exports =  checkNotAuthenticated;
module.exports =  checkAuthenticated;



// router.post("/login", async(req, res)=>{
//   try{
//     const email = req.body.email;
//     const password = req.body.password;
    
//     const userEmail = await User.findOne({email: email});
//     if(userEmail.password === password){
//       res.status(201).render('journal/index');
//     }
//     else{
//       res.send("invalid user");
//     }
//   }
//   catch(err){
//     res.status(400).send("invalid Email");
//   }
// })