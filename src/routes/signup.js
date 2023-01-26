const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/signup',(req, res)=>{
    res.render("signup");
  })
router.post('/signup', async(req,res) =>{
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