const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage')
const layout = require('../views/layout');
const {Page, User} = require('../models/index');
const wikiPage = require('../views/wikipage');
const mainPage = require('../views/main');

router.get('/', async (req, res, next) => {
  try {
    const pages = await Page.findAll();
    res.send(mainPage(pages));
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email
      }
    })
    const page = await Page.create({
      title: req.body.title,
      content: req.body.content,
      status: req.body.status
    });
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
    });
    const author = await page.getAuthor();
    res.send(wikiPage(page, author))
  } catch (error) {
    next(error);
  }
})

module.exports = router;
