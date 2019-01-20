const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./models/User');
require('./models/Survey');
require('./services/passport');           // passport config

// Connect to MongoDB
mongoose
  .connect(keys.mongoURI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


const app = express();

//body parser middleware to parse incoming request and assign it to req.body of incoming request
app.use(bodyParser.json());
// cookie session middleware (to process incoming req before sending them to route handlers)
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js or main.css file
  app.use(express.static('client/build'));

  // Express will index.html file if it doesn't recognise the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(___dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;        // Dynamic PORT binding
app.listen(PORT);
