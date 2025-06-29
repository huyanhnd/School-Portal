import express, { Router, Request, Response, NextFunction } from 'express';
import { Teacher } from '../models/Teacher';

const router: Router = express.Router();

/**
 * @swagger
 * /api/teachers:
 *   get:
 *     summary: Get list of teachers
 *     responses:
 *       200:
 *         description: List of teachers
 */
router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const teachers = await Teacher.findAll();
    res.status(200).json({ data: teachers });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/teachers:
 *   post:
 *     summary: Register a new teacher
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               subject:
 *                 type: string
 *               email:
 *                 type: string
 *               contactNumber:
 *                 type: string
 *     responses:
 *       201:
 *         description: Teacher created
 *       400:
 *         description: Validation error
 */
router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, subject, email, contactNumber } = req.body;
    const newTeacher = await Teacher.create({ name, subject, email, contactNumber });
    res.status(201).json(newTeacher);
  } catch (err) {
    next(err);
  }
});

export default router;