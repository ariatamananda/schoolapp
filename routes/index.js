const router = require('express').Router()
const studentRouter = require('./students')
const teacherRouter = require('./teachers')
const subjectRouter = require('./subjects')

// Routing Home
router.get("/", (req, res) => {
    res.render("home");
})

// Routing Teachers
router.use("/teachers", teacherRouter)

// Routing Students
router.use("/students", studentRouter)

// Routing Subjects
router.use("/subjects", subjectRouter)

module.exports = router