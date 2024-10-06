const express = require("express");
const router = express.Router();

const Person = require("./../models/Person");

router.post("/", async (req, res) => {
  try {
    // the request bosy containes the person data
    const data = req.body;
    // create a new person document using the mongoose model
    const newPerson = new Person(data);
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
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internla server error" });
  }
});

router.get("/:worktype", async (req, res) => {
  try {
    // Extract the work type from the URL parameter
    const worktype = req.params.worktype;
    if (worktype == "chef" || worktype == "manager" || worktype == "waiter") {
      const response = await Person.find({ work: worktype });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "work type not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server erorr" });
  }
});

router.put("/:id",async (req, res)=>{
    try{
        // Extract the id from the url parameter
        const personId = req.params.id;
        // updated data for ther person 
        const updatePersonData = req.body;
        
        const response = await Person.findByIdAndUpdate(personId,updatePersonData,{
            new: true,  // return the update document 
            runValidators : true // run mongoose validation
        })

        if(!response){
            return res.status(404).json({error : "person not found"});
        }

        console.log("data updated");
        res.status(200).json(response);
    }catch(error){
        console.log(error);
        res.status(500).json({ error: "internal server erorr" });
    }
})

router.delete("/:id",async (req,res)=>{
    try{
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            res.status(404).json({message : "person not found"});
        }
        console.log("data Delete");
        res.status(200).json({message : "person deleted succefully"});
    }catch(error){
        console.log(error);
        res.status(500).json({ error: "internal server erorr" });
    }
})
module.exports = router;