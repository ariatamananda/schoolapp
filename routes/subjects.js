const router = require('express').Router()
const SubjectController = require('../controllers/subjectController')

router.get("/", SubjectController.list)

router.get('/:id', SubjectController.findById)

module.exports = router