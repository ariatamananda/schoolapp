const ModelStudent = require('../models/modelStudent')

class StudentController {

    static list(req, res) {
        ModelStudent.findAll()
            .then(data => {
                res.render('students', {data})
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addForm(req, res) {
        let errors

        if(req.query.error){
            errors = JSON.parse(req.query.error)
        }
        res.render('addStudent', { errors })
    }

    static addPost(req, res) {
        let objStudent = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            gender: req.body.gender,
            birth_date: req.body.birth_date
        }
        ModelStudent.add(objStudent)
            .then(data => {
                res.redirect('/students')
            })
            .catch(err => {
                if (Array.isArray(err)){
                    res.redirect(`/students/add?error=${JSON.stringify(err)}`)
                } else {
                    res.send(err)
                }
            })
    }

    static editForm(req, res) {
        let id = Number(req.params.id)
        ModelStudent.edit(id)
            .then(data => {
                res.render('editStudent', {data})
            })
            .catch(err => {
                res.send(err)
            })
    }

    static editPost(req, res) {
        let objStudent = {
            id: Number(req.params.id),
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            gender: req.body.gender,
            birth_date: req.body.birth_date
        }
        ModelStudent.update(objStudent)
            .then(data => {
                res.redirect('/students')
            })
            .catch(err => {
                res.send(err)
            })    
    }

    static delete(req, res) {
        let id =  Number(req.params.id)
        ModelStudent.remove(id)
            .then(data => {
                res.redirect('/students')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static findByEmail(req, res) {
        let email = req.params.email
        ModelStudent.findByEmail(email)
            .then(data => {
                res.render('students', {data})
            })
            .catch(err => {
                res.send(err)
            })        
    }
}

module.exports = StudentController