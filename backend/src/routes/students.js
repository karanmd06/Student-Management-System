const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentControllers');
const auth = require('../middleware/auth');

router.get('/', auth, studentController.listStudents);
router.post('/', auth, studentController.createStudent);
router.get('/:id', auth, studentController.getStudent);
router.put('/:id', auth, studentController.updateStudent);
router.delete('/:id', auth, studentController.deleteStudent);

module.exports = router;