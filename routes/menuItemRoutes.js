
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
    res.status(500).json({ error: "internal server error" });
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