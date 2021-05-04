const express = require('express')
const app = express()
require("dotenv").config()
const port = process.env.PORT
const { card } = require('./service/sediksi/kirim-opini')
const bodyParser = require('body-parser')

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
        status: "OK",
        statusCode: 200,
        message: `Example app listening at http://localhost:${port}`
    })
})

app.post('/sediksi/kirim-opini', (req, res) => {
    const data = req.body
    card.submit(data).then(response => {
        res.json(response)
    }).catch(error => {
        res.status(404).json({
            status: "Error",
            message: error
        })
    })
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})