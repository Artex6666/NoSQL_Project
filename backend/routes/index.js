const express = require("express");
const authRoutes = require("./auth");
const popularMusicRoutes = require("./popularMusic");

const router = express.Router();

// Routes publiques
router.use("/login", authRoutes);
router.use("/register", authRoutes);
router.use("/home", popularMusicRoutes); // Route pour "/home"

// Routes protégées
router.use("/protectedRoute", (req, res) => {
  res.json({ message: "Accès autorisé" });
});

module.exports = router;
