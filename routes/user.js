const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send(`this is a GET request to /`);
})

router.get('/:id', (req, res, next) => {
  res.send(`this is a GET request to ${req.params.id}`);
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
