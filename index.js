const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const PORT = 1337;
const app = express();
const layout = require('./views/layout');
const {db} = require('./models/index');
const userRoutes = require('./routes/user');
const wikiRoutes = require('./routes/wiki');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));  //current directory and add's /public

app.use(bodyParser.urlencoded({ extended: false }));

(async () => {
  try {
    await db.sync();
  } catch (error){
    console.log(error);
  }
  app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
  });
})();

app.use('/users', userRoutes);
app.use('/wiki', wikiRoutes);

app.get('/', (req, res) => {
  res.redirect('/wiki');

});

db.authenticate().
then(() => {
  console.log('connected to the database');
});
