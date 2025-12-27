const express = require('express');
const Course = require('../models/Course');

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
router.post('/:id/enroll', async (req, res) => {
  try {
    // TODO: Add authentication middleware
    const studentId = req.body.studentId; // This should come from authenticated user

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
router.get('/:id/assignments', async (req, res) => {
  try {
    // TODO: Check if user is enrolled or is teacher
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

    res.json(course.assignments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;