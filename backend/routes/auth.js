const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Routes d'authentification (inscription, connexion, déconnexion)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterUser:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Le nom d'utilisateur
 *         email:
 *           type: string
 *           description: L'adresse e-mail de l'utilisateur
 *         password:
 *           type: string
 *           format: password
 *           description: Le mot de passe de l'utilisateur
 *     LoginUser:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: L'adresse e-mail de l'utilisateur
 *         password:
 *           type: string
 *           format: password
 *           description: Le mot de passe de l'utilisateur
 * 
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUser'
 *     responses:
 *       201:
 *         description: Nouvel utilisateur créé
 *       400:
 *         description: Erreur de validation ou email déjà existant
 *       500:
 *         description: Erreur serveur
 */
router.post("/register", authController.registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connecte un utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUser'
 *     responses:
 *       200:
 *         description: Utilisateur connecté avec succès, retourne un token
 *       400:
 *         description: Identifiants invalides
 *       500:
 *         description: Erreur serveur
 */
router.post("/login", authController.loginUser);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Déconnecte un utilisateur
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 *       401:
 *         description: Non autorisé, token manquant ou invalide
 *       500:
 *         description: Erreur serveur
 */
router.post("/logout", authMiddleware, authController.logoutUser);

module.exports = router;
