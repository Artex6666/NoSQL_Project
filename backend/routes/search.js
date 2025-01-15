// routes/search.js
const express = require("express");
const router = express.Router();
const searchController = require("../controllers/searchController");

/**
 * @swagger
 * tags:
 *   name: Search
 *   description: Recherche de musiques
 */

/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: Recherche de musiques par titre ou artiste
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Terme de recherche (titre ou artiste)
 *       - in: query
 *         name: userId
 *         required: false
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur pour identifier les musiques likées
 *     responses:
 *       200:
 *         description: Renvoie un tableau de musiques correspondant à la recherche
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
 *                   genre:
 *                     type: string
 *                   isFavorite:
 *                     type: boolean
 *                     description: Indique si la musique est dans les favoris de l'utilisateur
 *       400:
 *         description: Le paramètre 'query' est manquant
 *       500:
 *         description: Erreur lors de la recherche en base de données
 */
router.get("/", searchController.searchMusic);

module.exports = router;
