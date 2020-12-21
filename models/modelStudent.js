const pool = require('../config/connection')

class Student {
    constructor(id, first_name, last_name, email, gender, birth_date) {
        this.id = +id
        this.first_name = first_name
        this.last_name = last_name
        this.email = email
        this.gender = gender
        this.birth_date = birth_date
    }
}

class ModelStudent {

    static findAll() {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM "Students"`
            pool.query(query)
                .then(res => {
                    const data = res.rows
                    const insStudent = data.map((el) => new Student(el.id, el.first_name, el.last_name, el.email, el.gender, el.birth_date))
                    resolve(insStudent)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static add(objStudent) {
        return new Promise((resolve, reject) => {
            let errors = ModelStudent.validate(objStudent)
            if (errors.length > 0) {
                reject(errors)
            } else {
                let queryInsert = `
                INSERT INTO "Students" (first_name, last_name, email, gender, birth_date) VALUES ($1, $2, $3, $4, $5)
                    `
                let values = [
                    objStudent.first_name,
                    objStudent.last_name,
                    objStudent.email,
                    objStudent.gender,
                    objStudent.birth_date
                ]

                pool.query(queryInsert, values)
                    .then(data => {
                        resolve(data)
                    })
                    .catch(err => {
                        reject(err)
                    })
            }
        })
    }

    static validate(objStudent) {
        let errors = []
        if (objStudent.first_name === '' || objStudent.first_name.trim() == '' || objStudent.first_name === undefined) {
            errors.push(`First name can't be empty`)
        }
        if (objStudent.last_name === '' || objStudent.last_name.trim() == '' || objStudent.last_name === undefined) {
            errors.push(`Last name can't be empty`)
        }
        if (objStudent.email === '' || objStudent.email.trim() == '' || objStudent.email === undefined) {
            errors.push(`Email can't be empty`)
        }
        return errors
    }

    static edit(id) {
        return new Promise((resolve, reject) => {
            let queryGetData = `SELECT * FROM "Students" WHERE id = $1`
            pool.query(queryGetData, [id])
                .then(data => {
                    const value = data.rows
                    const newData = new Student(
                        value[0].id,
                        value[0].first_name,
                        value[0].last_name,
                        value[0].email,
                        value[0].gender,
                        value[0].birth_date
                    )
                    resolve(newData)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static update(objStudent) {
        return new Promise((resolve, reject) => {
            let queryUpdate = `
            UPDATE "Students" SET first_name = $2, last_name = $3, email = $4, gender = $5, birth_date = $6 WHERE id = $1
            `
            let values = [
                objStudent.id,
                objStudent.first_name,
                objStudent.last_name,
                objStudent.email,
                objStudent.gender,
                objStudent.birth_date
            ]
            pool.query(queryUpdate, values)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static remove(id) {
        return new Promise((resolve, reject) => {
            let queryDelete = `DELETE FROM "Students" WHERE id = $1`
            pool.query(queryDelete, [id])
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static findByEmail(email) {
        return new Promise((resolve, reject) => {
            let queryFind = `SELECT * FROM "Students" WHERE email = $1`
            pool.query(queryFind, [email])
                .then(res => {
                    const data = res.rows
                    const findEmail = []
                    const newData = new Student(
                        data[0].id,
                        data[0].first_name,
                        data[0].last_name,
                        data[0].email,
                        data[0].gender,
                        data[0].birth_date
                    )
                    findEmail.push(newData)
                    resolve(findEmail)
                })
                .catch(err => {
                    reject(err)
                })    
        })
    }
}

module.exports = ModelStudent