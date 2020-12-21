const router = require('express').Router()
const TeacherController = require('../controllers/teacherController')

router.get("/", TeacherController.list)

router.get('/:id', TeacherController.findById)

module.exports = router