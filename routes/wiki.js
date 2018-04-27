const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage')
const layout = require('../views/layout');

router.get('/', (req, res, next) => {
  res.send(layout(''));
})

router.post('/', (req, res, next) => {
  res.send(req.body.name + req.body.email + req.body.title + req.body.content + req.body.status);
})

router.get('/add', (req, res, next) => {
  res.send(addPage());
})

module.exports = router;
