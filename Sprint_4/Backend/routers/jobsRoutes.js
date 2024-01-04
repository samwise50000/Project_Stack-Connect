const express = require("express");
const {
  getJobs,
  getJob,
  createJob,
  deleteJob,
  updateJob,
} = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: API Endpoints for managing jobs
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
 *     Job:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the job
 *           example: Software Developer
 *         description:
 *           type: string
 *           description: The description of the job
 *           example: We are looking for a software developer to join our team.
 *         requirements:
 *           type: string
 *           description: The requirements of the job
 *           example: 2 years of experience in software development.
 *         location:
 *           type: string
 *           description: The location of the job
 *           example: Berlin, Germany
 *         company:
 *           type: string
 *           description: The company of the job
 *           example: Company Inc.
 *         type:
 *           type: array
 *           items:
 *             type: string
 *           description: The type of the job
 *           example:
 *             - Full-time
 *             - Part-time
 *         skills:
 *           type: string
 *           description: The skills of the job
 *           example: JavaScript, React, Node.js
 */

// Get all jobs
/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Get all jobs
 *     tags: [Jobs]
 *     responses:
 *       '200':
 *         description: Successfully retrieved jobs
 *       '500':
 *         description: Internal server error
 */
router.get("/", getJobs);

// Get a single job by ID
/**
 * @swagger
 * /jobs/{id}:
 *   get:
 *     summary: Get a single job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the job
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved the job
 *       '400':
 *         description: Invalid job ID format
 *       '404':
 *         description: Job not found
 */
router.get("/:id", getJob);

// Create a job
/**
 * @swagger
 * /jobs:
 *   post:
 *     summary: Create a job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       '201':
 *         description: Job created successfully
 *       '400':
 *         description: Missing or invalid fields
 *       '401':
 *         description: Unauthorized request
 */
router.post("/", protect, createJob);

// Update a job
/**
 * @swagger
 * /jobs/{id}:
 *   put:
 *     summary: Update a job by ID
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the job
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       '200':
 *         description: Job updated successfully
 *       '400':
 *         description: Invalid job ID format or missing fields
 *       '401':
 *         description: Unauthorized request
 */
router.put("/:id", protect, updateJob);

// Delete a job
/**
 * @swagger
 * /jobs/{id}:
 *   delete:
 *     summary: Delete a job by ID
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the job
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Job deleted successfully
 *       '400':
 *         description: Invalid job ID format
 *       '401':
 *         description: Unauthorized request
 */
router.delete("/:id", protect, deleteJob);

module.exports = router;
