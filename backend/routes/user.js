// routes/user.js
const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Gestion des favoris et des playlists
 */

/**
 * @swagger
 * /api/user/{userId}/addToFavorites:
 *   post:
 *     summary: Ajoute une chanson aux favoris de l'utilisateur
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
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
 *             required:
 *               - songId
 *     responses:
 *       200:
 *         description: Chanson ajoutée aux favoris
 *       400:
 *         description: Erreur lors de l'ajout
 *       404:
 *         description: Utilisateur introuvable
 */
router.post("/:userId/addToFavorites", userController.addToFavorites);

/**
 * @swagger
 * /api/user/{userId}/removeFromFavorites:
 *   delete:
 *     summary: Supprime une chanson des favoris de l'utilisateur
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
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
 *             required:
 *               - songId
 *     responses:
 *       200:
 *         description: Chanson supprimée des favoris
 *       400:
 *         description: Erreur lors de la suppression
 *       404:
 *         description: Utilisateur introuvable
 */
router.delete("/:userId/removeFromFavorites", userController.removeFromFavorites);

/**
 * @swagger
 * /api/user/{userId}/createPlaylist:
 *   post:
 *     summary: Crée une nouvelle playlist pour l'utilisateur
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nom de la playlist
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Playlist créée avec succès
 *       400:
 *         description: Erreur lors de la création
 *       404:
 *         description: Utilisateur introuvable
 */
router.post("/:userId/createPlaylist", userController.createPlaylist);

/**
 * @swagger
 * /api/user/{userId}/deletePlaylist:
 *   delete:
 *     summary: Supprime une playlist de l'utilisateur
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               playlistId:
 *                 type: string
 *                 description: ID de la playlist
 *             required:
 *               - playlistId
 *     responses:
 *       200:
 *         description: Playlist supprimée avec succès
 *       400:
 *         description: Erreur lors de la suppression
 *       403:
 *         description: L'utilisateur n'est pas autorisé à supprimer cette playlist
 *       404:
 *         description: Utilisateur ou playlist introuvable
 */
router.delete("/:userId/deletePlaylist", userController.deletePlaylist);

module.exports = router;
