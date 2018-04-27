const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage')
const layout = require('../views/layout');
const {Page} = require('../models/index');

//review regex later
function generateSlug (title) {
  // Removes all non-alphanumeric characters from title
  // And make whitespace underscore
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

router.get('/', (req, res, next) => {
  res.send(layout(''));
})

router.post('/', async (req, res, next) => {
  //res.send(req.body.name + req.body.email + req.body.title + req.body.content + req.body.status);
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    //slug: 
  });
  try{
    await page.save();
    res.redirect('/');
  }catch(error){
    next(error);
  }
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
})

module.exports = router;
