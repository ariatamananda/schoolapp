const pool = require('../config/connection')

class Subject {
    constructor(id, subject_name) {
        this.id = +id
        this.subject_name = subject_name
    }
}

class ModelSubject {

    static findAll() {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM "Subjects"`
            pool.query(query)
                .then(res => {
                    const data = res.rows
                    const insSubject = data.map((el) => new Subject(el.id, el.subject_name))
                    resolve(insSubject)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static findOne(id) {
        return new Promise((resolve, reject) => {
            let queryFind = `SELECT * FROM "Subjects" WHERE id = $1`
            pool.query(queryFind, [id])
                .then(res => {
                    const data = res.rows
                    const findId = []
                    const newData = new Subject(
                        data[0].id,
                        data[0].subject_name
                    )
                    findId.push(newData)
                    resolve(findId)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}

module.exports = ModelSubject