const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage')
const layout = require('../views/layout');
const {Page, User, db} = require('../models/index');
const wikiPage = require('../views/wikipage');
const mainPage = require('../views/main');

router.get('/', async (req, res, next) => {
  const pages = await Page.findAll();
  res.send(mainPage(pages));
})

router.post('/', async (req, res, next) => {
  const page = new Page(req.body);
  try {
    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email
      }
    })
    await page.save();
    page.setAuthor(user);
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
})

router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    })
    res.send(wikiPage(page))
  } catch (error) {
    next(error)
  }
})

module.exports = router;
