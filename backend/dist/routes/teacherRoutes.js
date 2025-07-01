"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Teacher_1 = require("../models/Teacher");
const router = express_1.default.Router();
// GET /teachers
router.get('/', async (req, res, next) => {
    try {
        const teachers = await Teacher_1.Teacher.findAll({
            attributes: ['name', 'subject', 'email', 'contactNumber']
        });
        res.status(200).json({ data: teachers });
    }
    catch (err) {
        next(err);
    }
});
// POST /teachers
router.post('/', async (req, res, next) => {
    try {
        const { name, subject, email, contactNumber } = req.body;
        // Basic validation
        if (!name || !subject || !email || !contactNumber) {
            res.status(400).json({ error: 'All fields (name, subject, email, contactNumber) are required.' });
            return;
        }
        // Email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({ error: 'Invalid email format.' });
            return;
        }
        // Check if email already exists
        const existingTeacher = await Teacher_1.Teacher.findOne({ where: { email } });
        if (existingTeacher) {
            res.status(400).json({ error: 'Email already exists.' });
            return;
        }
        const newTeacher = await Teacher_1.Teacher.create({ name, subject, email, contactNumber });
        res.status(201).json({ data: newTeacher });
    }
    catch (err) {
        // If Sequelize throws a validation error
        if (err.name === 'SequelizeValidationError') {
            res.status(400).json({ error: err.errors?.[0]?.message || 'Validation error.' });
        }
        else {
            next(err);
        }
    }
});
exports.default = router;
//# sourceMappingURL=teacherRoutes.js.map