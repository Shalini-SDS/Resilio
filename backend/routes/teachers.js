const express = require('express');
const { authenticate, requireTeacher } = require('../middleware/auth');
const User = require('../models/User');
const Course = require('../models/Course');
const Assignment = require('../models/Assignment');

const router = express.Router();

// Get teacher dashboard data
router.get('/dashboard', [authenticate, requireTeacher], async (req, res) => {
  try {
    const teacherId = req.user.id;

    // Get teacher's courses
    const courses = await Course.find({ teacher: teacherId });

    // Get total students
    const totalStudents = await Course.distinct('students', { teacher: teacherId });
    const uniqueStudents = [...new Set(totalStudents.flat())];

    // Get pending assignments to grade
    const pendingAssignments = await Assignment.find({
      teacher: teacherId,
      'submissions.grade': { $exists: false }
    }).populate('course', 'title');

    res.json({
      coursesCount: courses.length,
      studentsCount: uniqueStudents.length,
      pendingAssignmentsCount: pendingAssignments.length,
      recentActivity: [] // TODO: Implement activity log
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get teacher's courses
router.get('/courses', [authenticate, requireTeacher], async (req, res) => {
  try {
    const courses = await Course.find({ teacher: req.user.id })
      .populate('students', 'name email')
      .select('title description subject grade students schedule status');

    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new course
router.post('/courses', [authenticate, requireTeacher], async (req, res) => {
  try {
    const course = new Course({
      ...req.body,
      teacher: req.user.id
    });

    await course.save();
    res.status(201).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get course details with students and assignments
router.get('/courses/:courseId', [authenticate, requireTeacher], async (req, res) => {
  try {
    const course = await Course.findOne({
      _id: req.params.courseId,
      teacher: req.user.id
    })
    .populate('students', 'name email profile')
    .populate('assignments');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create assignment for a course
router.post('/courses/:courseId/assignments', [authenticate, requireTeacher], async (req, res) => {
  try {
    const course = await Course.findOne({
      _id: req.params.courseId,
      teacher: req.user.id
    });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const assignment = new Assignment({
      ...req.body,
      course: req.params.courseId,
      teacher: req.user.id
    });

    await assignment.save();

    // Add assignment to course
    course.assignments.push(assignment._id);
    await course.save();

    res.status(201).json(assignment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get assignments for teacher's courses
router.get('/assignments', [authenticate, requireTeacher], async (req, res) => {
  try {
    const assignments = await Assignment.find({ teacher: req.user.id })
      .populate('course', 'title subject')
      .populate('submissions.student', 'name email');

    res.json(assignments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Grade assignment submission
router.put('/assignments/:assignmentId/submissions/:submissionId/grade', [authenticate, requireTeacher], async (req, res) => {
  try {
    const { grade, feedback } = req.body;

    const assignment = await Assignment.findOne({
      _id: req.params.assignmentId,
      teacher: req.user.id
    });

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    const submission = assignment.submissions.id(req.params.submissionId);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    submission.grade = grade;
    submission.feedback = feedback;
    submission.gradedAt = new Date();
    submission.gradedBy = req.user.id;

    await assignment.save();

    res.json({ message: 'Grade submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get students in teacher's courses
router.get('/students', [authenticate, requireTeacher], async (req, res) => {
  try {
    const students = await User.find({
      _id: {
        $in: await Course.distinct('students', { teacher: req.user.id })
      }
    }).select('name email profile academicInfo status');

    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;