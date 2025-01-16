const jwt = require("jsonwebtoken");
const User = require("../models/user");

console.log(req.path);

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "All fields (username, email, password) are required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .cookie("token", token, {
        httpOnly: true, // Empêche l'accès au cookie par du JS côté client
        secure: false, // À mettre sur true en HTTPS
        sameSite: "strict", // Empêche le cookie d'être envoyé par d'autres domaines
        maxAge: 3600000, // 1 heure en millisecondes
      })
      .status(200)
      .json({ message: "User logged in successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const logoutUser = (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ message: "User logged out successfully" });
};

module.exports = { registerUser, loginUser, logoutUser };
