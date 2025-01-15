// routes/popularMusic.js
const express = require("express");
const popularMusicController = require("../controllers/popularMusicController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: PopularMusic
 *   description: Routes pour la musique populaire (top 10, etc.)
 */

/**
 * @swagger
 * /api/popularMusic:
 *   get:
 *     summary: Récupère les 10 musiques les plus populaires
 *     tags: [PopularMusic]
 *     responses:
 *       200:
 *         description: Tableau des 10 musiques les plus populaires
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   artist:
 *                     type: string
 *                   title:
 *                     type: string
 *                   duration:
 *                     type: number
 *                   popularity:
 *                     type: number
 *                   year:
 *                     type: number
 *                   genre:
 *                     type: string
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/", popularMusicController.getTop10PopularMusic);

module.exports = router;
