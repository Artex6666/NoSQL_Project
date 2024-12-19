const express = require("express");
const Music = require("../models/music");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const top10 = await Music.find()  
            .sort({ popularity:+1}) 
            .limit(10) 
            .select('artist title duration popularity year genre'); 

        res.status(200).json(top10); 
    } catch (err) {
        res.status(500).json({ error: "Error 500 ", details: err.message });
    }
});

module.exports = router;
