const express = require('express');
const User = require('../models/users');
const router = express.Router();
router.get('/signup',(req, res)=>{
    res.render("signup");
  })
router.post('/signup', async(req,res) =>{
    try {
      const password = req.body.password;
      const confirmpassword = req.body.confirmpassword;
      if(password === confirmpassword){
        const user = new User({
          uname: req.body.name,
          email: req.body.email,
          password: req.body.password
        })
        console.log(unmae+email+password);
       const signed =  await user.save();
       res.status(200).send(signed);
      }
      else{
        res.send("Password not matching")
      }
    }
    catch(err){
      res.status(400).send(err);
    }
  })

module.exports = router;