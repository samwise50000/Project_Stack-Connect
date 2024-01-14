const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API endpoints for managing users
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: The first name of the user
 *           example: John
 *         lastName:
 *           type: string
 *           description: The last name of the user
 *           example: Doe
 *         email:
 *           type: string
 *           description: The email of the user
 *           example: john.doe@email.com
 *         password:
 *           type: string
 *           description: The password of the user
 *           example: password123
 */

// Register a user
/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User registered successfully
 *       '400':
 *         description: Bad request
 */
router.post("/register", registerUser);

// Login a user
/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login an existing user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user
 *                 example: john.doe@email.com
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 example: ABCabc123!
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '400':
 *         description: Bad request
 */
router.post("/login", loginUser);

// Get a user profile
/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get user profile information
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User profile retrieved successfully
 *       '401':
 *         description: Unauthorized request
 */
router.get("/profile", protect, getUser);

// Get all users
/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Users retrieved successfully
 *       '401':
 *         description: Unauthorized request
 */
router.get("/", protect, getUsers);

// Update a user profile
/**
 * @swagger
 * /user/profile:
 *   put:
 *     summary: Update user profile information
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User profile updated successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized request
 */
router.put("/profile", protect, updateUser);

// Delete a user profile
/**
 * @swagger
 * /user/profile:
 *   delete:
 *     summary: Delete user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User profile deleted successfully
 *       '401':
 *         description: Unauthorized request
 */
router.delete("/profile", protect, deleteUser);

module.exports = router;
