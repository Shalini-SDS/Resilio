const express = require('express');
const Course = require('../models/Course');
const { authenticate, requireTeacher, requireStudent } = require('../middleware/auth');

const router = express.Router();

// Get all courses (public)
router.get('/', async (req, res) => {
  try {
    const { subject, grade, status = 'active' } = req.query;

    const filter = { status };
    if (subject) filter.subject = subject;
    if (grade) filter.grade = grade;

    const courses = await Course.find(filter)
      .populate('teacher', 'name email')
      .select('title description subject grade teacher schedule status');

    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get course by ID (public basic info)
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('teacher', 'name email')
      .select('title description subject grade teacher schedule syllabus status');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Enroll student in course (requires authentication)
router.post('/:id/enroll', authenticate, requireStudent, async (req, res) => {
  try {
    const studentId = req.user.id; // Get from authenticated user

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.students.includes(studentId)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    course.students.push(studentId);
    await course.save();

    res.json({ message: 'Successfully enrolled in course' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get course assignments (requires enrollment)
router.get('/:id/assignments', authenticate, async (req, res) => {
  try {
    // Check if user is enrolled or is teacher
    const course = await Course.findById(req.params.id)
      .populate({
        path: 'assignments',
        populate: {
          path: 'teacher',
          select: 'name email'
        }
      });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Allow if user is teacher of the course or enrolled student
    const isTeacher = course.teacher.toString() === req.user.id;
    const isEnrolled = course.students.includes(req.user.id);

    if (!isTeacher && !isEnrolled) {
      return res.status(403).json({ message: 'Access denied. Not enrolled in this course.' });
    }

    res.json(course.assignments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;