const router = require('express').Router()
const StudentController = require('../controllers/studentController')

router.get("/", StudentController.list)

router.get("/add", StudentController.addForm)
router.post("/add", StudentController.addPost)

router.get("/:id/edit", StudentController.editForm)
router.post("/:id/edit", StudentController.editPost)

router.get('/:id/delete', StudentController.delete)

router.get('/:email', StudentController.findByEmail)

module.exports = router