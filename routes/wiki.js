const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage')
const layout = require('../views/layout');

router.get('/', (req, res, next) => {
  res.send(layout(''));
})

router.post('/', (req, res, next) => {
  res.send(`this is a POST request to /`);
})

router.get('/add', (req, res, next) => {
  res.send(addPage());
})

module.exports = router;
