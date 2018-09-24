const express        = require('express');
const bodyParser     = require('body-parser');

// initialise the app
const app            = express();

// Set up the port we want to listen to for this app
const port = 3000;
app.listen(port, () => {
  console.log('We are live on port:' + port);
});

// Unfortunately, Express can’t process "x-www-form-urlencoded" post form on its own. body-parser package helps fot that [needs to be before  routes definition]
app.use(bodyParser.urlencoded({ extended: true }));


require('./app/routes')(app);
