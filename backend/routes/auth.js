const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
    const { username, email, password } = req.body;
    res.status(201).json({ message: "User registered successfully" });
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    res.status(200).json({ message: "User logged in successfully" });
});

module.exports = router;

