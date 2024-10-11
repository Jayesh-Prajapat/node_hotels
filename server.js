const express = require("express");
const app = express();
const db = require("./db");
const passport = require('./auth');
require('dotenv').config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
  next(); // Move on to the next phase
}
app.use(logRequest);


app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false})


// Define a GET route
app.get("/",localAuthMiddleware, (req, res) => {
  res.send("Welcome to our hotel");
});


// import the router files
const personRoutes = require("./routes/personRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");

app.use('/person', personRoutes);
app.use('/menu',menuItemRoutes);

const PORT = process.env.PORT || 3000;


// import the routers
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});