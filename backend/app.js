const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

// Import des routes //
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const playlistRoutes = require("./routes/playlist");
const searchRoutes = require("./routes/search");
const recommendationRoutes = require("./routes/recommendation");
//-----------------------------------------------------------------//


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//


mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));


//////////////////////////////////////////////////////
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/playlist", playlistRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/recommendations", recommendationRoutes);
///////////////////////////////////////////////////////


app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Démarrage du serv
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
