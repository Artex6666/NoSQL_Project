const Playlist = require("../models/playlist");
const User = require("../models/user");

//Ajoute une chanson à une playlist

exports.addToPlaylist = async (req, res) => {
  const { userId } = req.params;
  const { songId, playlistId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    playlist.songs.push(songId);
    await playlist.save();
    res.status(200).json({ message: "Song added to playlist", playlist });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


//Supprime une chanson d'une playlist

exports.removeFromPlaylist = async (req, res) => {
  const { userId } = req.params;
  const { songId, playlistId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    playlist.songs = playlist.songs.filter((song) => song.toString() !== songId);
    await playlist.save();
    res.status(200).json({ message: "Song removed from playlist", playlist });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

