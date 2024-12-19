const express = require("express");
const Music = require("../models/music");
const User = require("../models/user"); 
const router = express.Router();

router.get("/", async (req, res) => {
    const { query, userId } = req.query;  

    if (!query) {
        return res.status(400).json({ message: "Query is required" });
    }

    try {
        const results = await Music.find({
            $or: [
                { title: { $regex: query, $options: "i" } },   // i = insensible à la casse
                { artist: { $regex: query, $options: "i" } }    // i = insensible à la casse
            ]
        }).select('artist title duration popularity genre');

        let favorites = [];
        if (userId) {
            const user = await User.findById(userId).populate("likedMusics", "title artist");
            favorites = user.likedMusics; 
        }

        const resultsWithFavorites = results.map((song) => {
            const isFavorite = favorites.some(fav => fav._id.toString() === song._id.toString()); 
            return {
                ...song.toObject(),
                isFavorite,  
            };
        });

        res.status(200).json(resultsWithFavorites); 
    } catch (err) {
        res.status(500).json({ error: "Error while searching in the database", details: err.message });
    }
});

module.exports = router;
