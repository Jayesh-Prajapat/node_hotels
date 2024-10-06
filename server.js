const express = require("express");
const app = express();
const db = require("./db");
const Person = require("./models/Person");
const MenuItem = require("./models/MenuItem");
require('dotenv').config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Define a GET route
app.get("/", (req, res) => {
  res.send("Welcome to our hotel");
});


// import the router files
const personRoutes = require("./routes/personRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");

app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes);

const PORT = process.env.PORT || 3000;


// import the routers
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});