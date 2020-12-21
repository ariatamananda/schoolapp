const ModelSubject = require('../models/modelSubject')

class SubjectController {

    static list(req, res) {
        ModelSubject.findAll()
            .then(data => {
                res.render('subjects', {data})
            })
            .catch(err => {
                res.send(err)
            })
    }

    static findById(req, res) {
        let id = Number(req.params.id)
        ModelSubject.findOne(id)
            .then (data => {
                res.render('subjects', {data})
            })
            .catch(err => {
                res.send(err)
            })    
    }
}

module.exports = SubjectController