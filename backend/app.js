const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const router = require('./routes');
const authMiddleware = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { createUserValid, loginValid } = require('./middlewares/validation');
const { createUser, login } = require('./controllers/users');

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => console.log('MongoDB has been connected'))
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());

app.post('/signin', loginValid, login);
app.post('/signup', createUserValid, createUser);

app.use(router);
app.use(authMiddleware);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`The server is running on port: ${PORT}`);
});
