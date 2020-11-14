const express = require('express')

const app = express()
const stocks = require('./routes/all.routes')

app.use(express.json({ extended: true }))
app.use('/', stocks)

app.listen(5000, () => console.log('Been started'))