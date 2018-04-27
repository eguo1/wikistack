const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage')

router.get('/', (req, res, next) => {
  res.send(`this is a GET request to /`);
})

router.post('/', (req, res, next) => {
  res.send(`this is a POST request to /`);
})

router.get('/add', (req, res, next) => {
  res.send(addPage());
})

module.exports = router;
