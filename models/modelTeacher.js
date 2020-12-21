const pool = require('../config/connection')

class Teacher {
    constructor(id, first_name, last_name, email, gender) {
        this.id = +id
        this.first_name = first_name
        this.last_name = last_name
        this.email = email
        this.gender = gender
    }
}

class ModelTeacher {

    static findAll() {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM "Teachers"`
            pool.query(query)
                .then(res => {
                    const data = res.rows
                    const insTeacher = data.map((el) => new Teacher(el.id, el.first_name, el.last_name, el.email, el.gender))
                    resolve(insTeacher)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static findOne(id) {
        return new Promise((resolve, reject) => {
            let queryFind = `SELECT * FROM "Teachers" WHERE id = $1`
            pool.query(queryFind, [id])
                .then(res => {
                    const data = res.rows
                    const findId = []
                    const newData = new Teacher(
                        data[0].id,
                        data[0].first_name,
                        data[0].last_name,
                        data[0].email,
                        data[0].gender
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

module.exports = ModelTeacher