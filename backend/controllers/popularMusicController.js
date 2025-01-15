
const Music = require("../models/music");

// chope les 10 musiques les plus populaires
 
exports.getTop10PopularMusic = async (req, res) => {
  try {
    const top10 = await Music.find()
      .sort({ popularity: -1 })
      .limit(10)
      .select("artist title duration popularity year genre");

    res.status(200).json(top10);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération du Top 10", details: err.message });
  }
};

