const pool = require("./config/connection")
const fs = require('fs')

let dataStudent = JSON.parse(fs.readFileSync('./data/students.json', 'utf-8'))
let insStudent = []
dataStudent.map(el => {
    insStudent.push(`('${el.first_name}', '${el.last_name}', '${el.email}', '${el.gender}', '${el.birth_date}')`)
    return el
})
let studentValue = insStudent.join(',')
const insertStudents = `INSERT INTO "Students" ("first_name", "last_name", "email", "gender", "birth_date") VALUES ${studentValue}`

let dataTeacher = JSON.parse(fs.readFileSync('./data/teachers.json', 'utf-8'))
let insTeacher = []
dataTeacher.map(el => {
    insTeacher.push(`('${el.first_name}', '${el.last_name}', '${el.email}', '${el.gender}')`)
    return el
})
let teacherValue = insTeacher.join(',')
const insertTeachers = `INSERT INTO "Teachers" ("first_name", "last_name", "email", "gender") VALUES ${teacherValue}`

let dataSubject = JSON.parse(fs.readFileSync('./data/subjects.json', 'utf-8'))
let insSubject = []
dataSubject.map(el => {
    insSubject.push(`('${el.subject_name}')`)
    return el
})
let subjectValue = insSubject.join(',')
const insertSubjects = `INSERT INTO "Subjects" ("subject_name") VALUES ${subjectValue}`

pool.query(insertTeachers, (err, res) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`>> Seeding Teacher success`)
        pool.query(insertStudents, (err, res) => {
            if (err) {
                console.log(err)
            } else {
                console.log(`>> Seeding Student success`)
                pool.query(insertSubjects, (err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(`>> Seeding Subject success`)
                        pool.end()
                    }
                })
            }
        })
    }
})
