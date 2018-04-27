const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const PORT = 1337;
const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));  //current directory and add's /public

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req,res) => {
  res.send('hello world');
});

app.listen(PORT , () => {
  console.log(`listening to port ${PORT}`);

});