const ModelTeacher = require('../models/modelTeacher')

class TeacherController {

    static list(req, res) {
        ModelTeacher.findAll()
            .then(data => {
                res.render('teachers', {data})
            })
            .catch(err => {
                res.send(err)
            })
    }

    static findById(req, res) {
        let id = Number(req.params.id)
        ModelTeacher.findOne(id)
            .then(data => {
                res.render('teachers', {data})
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = TeacherController