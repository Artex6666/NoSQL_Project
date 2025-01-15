// routes/playlist.js
const express = require("express");
const playlistController = require("../controllers/playlistController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Playlist
 *   description: Gestion des playlists (ajout / suppression de chansons)
 */

/**
 * @swagger
 * /api/playlist/{userId}/addToPlaylist:
 *   post:
 *     summary: Ajoute une chanson à la playlist
 *     description: Ajoute une chanson identifiée par songId à la playlist spécifiée par playlistId pour l'utilisateur userId
 *     tags: [Playlist]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               songId:
 *                 type: string
 *                 description: ID de la chanson à ajouter
 *               playlistId:
 *                 type: string
 *                 description: ID de la playlist
 *     responses:
 *       200:
 *         description: Chanson ajoutée avec succès à la playlist
 *       400:
 *         description: Erreur de validation ou autre problème
 *       404:
 *         description: Utilisateur ou playlist introuvable
 */
router.post("/:userId/addToPlaylist", playlistController.addToPlaylist);

/**
 * @swagger
 * /api/playlist/{userId}/removeFromPlaylist:
 *   delete:
 *     summary: Supprime une chanson de la playlist
 *     description: Supprime la chanson identifiée par songId de la playlist spécifiée par playlistId pour l'utilisateur userId
 *     tags: [Playlist]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               songId:
 *                 type: string
 *                 description: ID de la chanson à retirer
 *               playlistId:
 *                 type: string
 *                 description: ID de la playlist
 *     responses:
 *       200:
 *         description: Chanson supprimée avec succès de la playlist
 *       400:
 *         description: Erreur de validation ou autre problème
 *       404:
 *         description: Utilisateur ou playlist introuvable
 */
router.delete("/:userId/removeFromPlaylist", playlistController.removeFromPlaylist);

module.exports = router;
