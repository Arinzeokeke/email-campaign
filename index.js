const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./models/user');
require('./models/survey');
require('./services/passport');

mongoose.connect(keys.mongoURI);

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

const authRoute = require('./routes/auth');
const billingRoute = require('./routes/billing');
const surveyRoute = require('./routes/survey');

app.use('/', authRoute);
app.use('/', billingRoute);
app.use('/api/surveys', surveyRoute);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
} else {
  mongoose.set('debug', true);
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
