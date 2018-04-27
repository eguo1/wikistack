const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const PORT = 1337;
const app = express();
const layout = require('./views/layout');
const { Page, User, db} = require('./models/index');
const userRoutes = require('./routes/user');
const wikiRoutes = require('./routes/wiki');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));  //current directory and add's /public

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user', userRoutes);
app.use('/wiki', wikiRoutes);

app.get('/', (req, res) => {
  res.send(layout(''));
});

const init = async () => {
  try {
    await db.sync();
  //  await Page.sync();
  //  await User.sync();
  } catch (error){
    console.log(error);
  }
  app.listen(PORT , () => {
    console.log(`listening to port ${PORT}`);
  });
}
    
init();

db.authenticate().
then(() => {
  console.log('connected to the database');
});
