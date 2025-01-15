const User = require("../models/user");
const Playlist = require("../models/playlist");


// Ajoute  une chanson au favoris 

exports.addToFavorites = async (req, res) => {
  const { userId } = req.params;
  const { songId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.likedMusics.includes(songId)) {
      return res.status(400).json({ message: "Song already in favorites" });
    }

    user.likedMusics.push(songId);
    await user.save();
    res.status(200).json({ message: "Song added to favorites", user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprime une chanson des favoris 
exports.removeFromFavorites = async (req, res) => {
  const { userId } = req.params;
  const { songId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.likedMusics = user.likedMusics.filter((song) => song.toString() !== songId);
    await user.save();
    res.status(200).json({ message: "Song removed from favorites", user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//Créer une nouvelle playlist pour l'utilisateur

exports.createPlaylist = async (req, res) => {
  const { userId } = req.params;
  const { name } = req.body; 

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newPlaylist = new Playlist({
      name,
      user: userId, 
      songs: [],    
    });

    await newPlaylist.save();

    user.playlists.push(newPlaylist._id);
    await user.save();

    res.status(201).json({ message: "Playlist created successfully", playlist: newPlaylist });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//Supprimer une nouvelle playlist pour l'utilisateur

exports.deletePlaylist = async (req, res) => {
  const { userId } = req.params;
  const { playlistId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    if (playlist.user.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this playlist" });
    }

    await playlist.remove();

    user.playlists = user.playlists.filter((p) => p.toString() !== playlistId);
    await user.save();

    res.status(200).json({ message: "Playlist deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
