const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();
    res.status(201).json({ message: "Nouvel utilisateur crée!" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/:userId/addToFavorites", async (req, res) => {
  const { userId } = req.params;
  const { songId } = req.body;  

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.favorites.includes(songId)) {
      return res.status(400).json({ message: "Song already in favorites" });
    }

    user.favorites.push(songId);
    await user.save();
    res.status(200).json({ message: "Song added to favorites", user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:userId/removeFromFavorites", async (req, res) => {
  const { userId } = req.params;
  const { songId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.favorites = user.favorites.filter((song) => song.toString() !== songId);
    await user.save();
    res.status(200).json({ message: "Song removed from favorites", user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
