const express = require("express");
const router = express.Router();

const MenuItem  = require('./../models/MenuItem');

router.post("/", async (req, res) => {
  try {
    // the request bosy containes the person data
    const data = req.body;
    // create a new person document using the mongoose model
    const newPerson = new MenuItem(data);
    // save the new perosn in database
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internla server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("data are fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internla server error" });
  }
});

router.get("/:tasty", async (req, res) => {
  try {
    // Extract the work type from the URL parameter
    const tasty = req.params.tasty;
    if (tasty == "sweet" || tasty == "sour" || tasty == "spicy") {
      const response = await MenuItem.find({ taste: tasty });
      console.log("response fetched");
      res.status(200).json(response);
    }else{
      res.status(404).json({ error: "work type not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server erorr" });
  }
});

module.exports = router;