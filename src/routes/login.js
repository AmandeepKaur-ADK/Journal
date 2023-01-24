const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.get("/login", (req, res)=>{
    res.render("login");
  })
  router.post("/login", async(req, res)=>{
    try{
      const email = req.body.email;
      const password = req.body.password;
      
      const userEmail = await User.findOne({email: email});
      if(userEmail.password === password){
        res.status(201).render('journal');
      }
      else{
        res.send("invalid user");
      }
    }
    catch(err){
      res.status(400).send("invalid Email");
    }
  })

module.exports = router;