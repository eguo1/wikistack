const express = require('express');
const router = express.Router();
const {Page, User} = require('../models/index');
const userList = require('../views/userList')
const userPage = require('../views/userPages')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(userList(users));
  } catch (error) {
    next(error);
  }
})

router.get('/:id', async (req, res, next) => {
  const userP = User.findById(req.params.id);
  const pagesP = Page.findAll({
    where: {
      authorId: req.params.id
    }
  });
  try {
    const [user, pages] = await Promise.all([userP, pagesP])
    res.send(userPage(user, pages));
  } catch (error) {
    next(error);
  }
})

router.post('/', (req, res, next) => {
  res.send("this is a post request to users.");
})

router.put('/:id', (req, res, next) => {
  res.send(`this is a PUT request to ${req.params.id}`);
})

router.delete('/:id', (req, res, next) => {
  res.send(`this is DELETE request to ${req.params.id}`);
})

module.exports = router;
