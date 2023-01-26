const express = require('express');
const Journal = require('../models/journal');
const { route } = require('./home');
const checkAuthenticated = require('./login')
require('./login')
const router = express.Router();

router.get("/journal", checkAuthenticated ,async (req, res)=>{
  const journal = await Journal.find().sort({createdAt: 'descending'})
  res.render("journal/index", {journal: journal});
})

router.get('/journal/new',  (req, res)=>{
  res.render('journal/new', { journal: new Journal() });
})

router.get('/journal/edit/:id', async (req, res)=>{
  const journal = await Journal.findById(req.params.id)
  res.render('journal/_edit', { journal: journal });
})

router.get('/journal/:slug', async (req, res)=>{
  // res.send(req.params.id);
  const journal = await Journal.findOne({slug: req.params.slug});
  if(journal == null) res.redirect('/journal');
  res.render('journal/show', {journal: journal});
})

 

  router.post('/journal', async (req, res, next)=>{    
    req.journal = new Journal()
    next()
  },saveJournalAndRedirect('new'))

  router.put('/journal/:id', async(req, res, next)=>{
    req.journal = await Journal.findById(req.params.id)
    next()
  },saveJournalAndRedirect('_edit'))


  function saveJournalAndRedirect(path){
    return async (req, res)=>{
      let journal = req.journal 
      journal.title =  req.body.title
      journal.content =  req.body.content
      journal.markdown = req.body.markdown
      try{
         article = await journal.save();
        res.redirect(`/journal/${journal.slug}`);
      }catch(err){
        console.log(err);
        res.render(`journal/${path}`, {journal: journal});
      }
    }
  }
  router.delete('/journal/:id', async (req, res)=>{
    await Journal.findByIdAndDelete(req.params.id);
    res.redirect('/journal');
  })
 
module.exports = router;




 // router.post('/journal', async (req, res, next)=>{    
  //   let journal = new Journal({
  //     title:  req.body.title,
  //     content:  req.body.content,
  //     markdown: req.body.markdown
  //   })
  //   try{

  //     article = await journal.save();
  //     res.redirect(`/journal/${journal.slug}`);
  //   }catch(err){
  //     console.log(err);
  //     res.render('journal/new', {journal: journal});
  //   }
  // })
   


  // router.put('/journal/:id', async(req, res)=>{
  //   req.journal = await Journal.findById(req.params.id)
  //   return async (req, res)=>{
  //   let journal = req.journal 
  //   journal.title =  req.body.title
  //   journal.content =  req.body.content
  //   journal.markdown = req.body.markdown
  //   console.log(req.body.title);
  //   try{
  //     journal = await journal.save();
  //     console.log(`${journal.slug}`);
  //     res.redirect(`/journal/${journal.slug}`);
  //   }catch(err){
  //     console.log(err);
  //     res.render('journal/_edit', {journal: journal});
  //   }
  // }
  // })
