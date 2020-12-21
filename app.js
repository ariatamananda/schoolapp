const express = require('express')
const app = express()
const PORT = 3002
const router = require('./routes')

//Template engine
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended : false}))

// Routing
app.use(router)

// Listening port
app.listen(PORT, () => {
    console.log(`This App is running at http://localhost:${PORT}`)
})