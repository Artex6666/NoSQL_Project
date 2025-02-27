const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const csvParser = require("csv-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const cookieParser = require("cookie-parser");
var colors = require("colors")

// --- Import des routes --- //
const authMiddleware = require("./middleware/authMiddleware")

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const playlistRoutes = require("./routes/playlist");
const searchRoutes = require("./routes/search");
const popularMusic = require("./routes/popularMusic");
//-----------------------------------------------------------------//

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Spotify Like",
      version: "1.0.0",
      description: "Doc API",
    },
  },
  apis: ["./routes/*.js"], 
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected".green))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const Music = require("./models/music");

const importCsvData = async () => {
    try {
      const count = await Music.countDocuments();
      if (count > 0) {
        console.log("Data already imported to MongoDB. Skipping CSV import.".yellow);
        return;
      }
  
      const results = [];
      fs.createReadStream("./datasets/songs.csv")
        .pipe(csvParser())
        .on("data", (data) => {
          const music = new Music({
            artist: data.artist,
            title: data.song, 
            release_date: new Date(data.year, 0, 1), 
            duration: data.duration_ms, 
            popularity: data.popularity,
            genre: data.genre,
          });
  
          results.push(music);
        })
        .on("end", async () => {
          try {
            await Music.insertMany(results);
            console.log(`${results.length} songs were successfully added to the database.`.orange);
          } catch (err) {
            console.error("Error inserting data into MongoDB:", err);
          }
        })
        .on("error", (err) => {
          console.error("Error reading the CSV file:".red, err);
        });
    } catch (err) {
      console.error("Error during CSV import:".red, err);
    }
  };

importCsvData();

//////////////////////////////////////////////////////
app.use("/api/search", searchRoutes);
app.use("/api/popularMusic", popularMusic);
app.use("/api/auth", authRoutes);

// Routes nécéssitant d'etre connectés : 
app.use(authMiddleware);
app.use("/api/user", userRoutes);
app.use("/api/playlist", playlistRoutes);
///////////////////////////////////////////////////////

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log("Server running on ".green + `http://localhost:${PORT}`.cyan);
  console.log("API docs available on ".green + `http://localhost:${PORT}/api/docs`.cyan);
});
