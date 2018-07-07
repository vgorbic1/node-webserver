const express = require('express');
const fs = require('fs');

// Import Handlebars module
const hbs = require('hbs');

let app = express();

// Register middleware
// use next() to finish procedure and move to next 
app.use((req, res, next) => {
  // Loggin functionality
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  // Log to console
  console.log(log);
  // Log to file
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) console.log('Unable to append to server.log');
  }); 
  next();
});

// Maintenance Mode
// this stops everything below from executing,
// because there is no next();
app.use((req, res, next) => {
  res.render('maintenance.hbs');
});

// Include partials
hbs.registerPartials(__dirname + '/views/partials');

// Include helper functions
// Function to use in footer
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

// Function to use on Help page
hbs.registerHelper('screamText', (text) => {
  return text.toUpperCase();
})

// Set express configuration
// Set Handlebars as a template engine
app.set('view engine', 'hbs');

// Render Handlebars template for Home page
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
  });
});

// Render Handlebars template for Help page
app.get('/help', (req, res) => {
  res.render('help.hbs', {
    pageTitle: 'Help Page',
  });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000 ...');
  }
);