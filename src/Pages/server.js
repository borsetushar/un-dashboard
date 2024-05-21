// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/universityDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('Error Connecting:', err));

// Schemas and Models
const studentSchema = new mongoose.Schema({
  _id: String,
  name: String,
  email: String,
  password: String,
  enrollment_year: Number,
  field_id: String,
});

const fieldSchema = new mongoose.Schema({
  _id: String,
  field_name: String,
});

const subjectSchema = new mongoose.Schema({
  _id: String,
  subject_name: String,
  field_id: String,
});

const markSchema = new mongoose.Schema({
  _id: String,
  student_id: String,
  subject_id: String,
  marks: Number,
});
const signUpSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  enrollment_year: Number,
  field: String,
});

const SignUp = mongoose.model('SignUp', signUpSchema);
const Student = mongoose.model('Student', studentSchema);
const Field = mongoose.model('Field', fieldSchema);
const Subject = mongoose.model('Subject', subjectSchema);
const Mark = mongoose.model('Mark', markSchema);

// Routes
app.get('/students/:id', async (req, res) => {
  try {
    const studentId = req.params.id.trim();
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    console.error('Error fetching student:', err);
    res.status(500).json({ message: err.message });
  }
});

app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/fields', async (req, res) => {
  try {
    const fields = await Field.find();
    res.json(fields);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/subjects', async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/marks', async (req, res) => {
  try {
    const marks = await Mark.find();
    res.json(marks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/signups', async (req, res) => {
  try {
    const signups = await SignUp.find();
    res.json(signups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/signup', async (req, res) => {
  try {
    const { name, email, password, enrollmentYear, field } = req.body;
    const newSignUp = new SignUp({
      name,
      email,
      password,
      enrollment_year: enrollmentYear,
      field: field,
    });
    await newSignUp.save();
    res.status(201).json({ message: 'Sign-up successful' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
