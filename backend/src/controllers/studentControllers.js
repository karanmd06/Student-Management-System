const Student = require('../models/Student');


exports.listStudents = async (req, res) => {
const q = req.query.q;
const filter = q ? { $text: { $search: q } } : {};
try {
const students = await Student.find(filter).limit(200);
res.json(students);
} catch (err) {
res.status(500).json({ error: err.message });
}
};


exports.createStudent = async (req, res) => {
try {
const s = new Student(req.body);
await s.save();
res.status(201).json(s);
} catch (err) {
res.status(400).json({ error: err.message });
}
};


exports.getStudent = async (req, res) => {
try {
const s = await Student.findById(req.params.id);
if (!s) return res.status(404).send('Not found');
res.json(s);
} catch (err) { res.status(500).json({ error: err.message }); }
};


exports.updateStudent = async (req, res) => {
try {
const s = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
res.json(s);
} catch (err) { res.status(400).json({ error: err.message }); }
};


exports.deleteStudent = async (req, res) => {
try {
await Student.findByIdAndDelete(req.params.id);
res.json({ success: true });
} catch (err) { res.status(500).json({ error: err.message }); }
};