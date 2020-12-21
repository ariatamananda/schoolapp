const pool = require("./config/connection")

let createTeacher = `DROP TABLE IF EXISTS "Teachers";
    CREATE TABLE IF NOT EXISTS "Teachers" (
        "id" SERIAL PRIMARY KEY,
        "first_name" VARCHAR(50) NOT NULL,
        "last_name" VARCHAR(50) NOT NULL,
        "email" VARCHAR(50) NOT NULL,
        "gender" VARCHAR(10)
    );`
    
let createStudent = `DROP TABLE IF EXISTS "Students";
    CREATE TABLE IF NOT EXISTS "Students" (
        "id" SERIAL PRIMARY KEY,
        "first_name" VARCHAR(50) NOT NULL,
        "last_name" VARCHAR(50) NOT NULL,
        "email" VARCHAR(50) NOT NULL,
        "gender" VARCHAR(10) NOT NULL,
        "birth_date" DATE
    );`
let createSubject = `DROP TABLE IF EXISTS "Subjects";
    CREATE TABLE IF NOT EXISTS "Subjects" (
        "id" SERIAL PRIMARY KEY,
        "subject_name" VARCHAR(25) NOT NULL
    );`


pool.query(createTeacher, (err, res) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`>> Table Teacher is done`)
        pool.query(createStudent, (err, res) => {
            if (err) {
                console.log(err)
            } else {
                console.log(`>> Table Student is done`)
                pool.query(createSubject, (err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(`>> Table Subject is done`)
                        pool.end()
                    }
                })
            }
        })      
    } 
})