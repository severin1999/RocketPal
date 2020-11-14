const {Router} = require('express')
const fs = require('fs')
const { parse } = require('path')
const path = require('path')
const router = Router()

let allStocks = null
fs.readFile(
    path.join(__dirname, '../', 'data.json'),
    'utf-8',
    (err, data) => {
        if (err) throw new Error('err')
        allStocks = JSON.parse(data)
    }
)

router.get('/all', (_, res) => {
    res.json(allStocks)
})

router.post('/byName', (req, res) => {

    const { value } = req.body
    const stock = allStocks.filter(data => data.name === value.toUpperCase())

    res.json(stock)
})

router.post('/add', (req, res) => {
    const newStock = {
        name: req.body.stockName, price: req.body.stockPrice
    }
    allStocks.push(newStock)

    fs.writeFile(
        path.join(__dirname, '../', 'data.json'),
        Buffer.from(JSON.stringify(allStocks)),
        err => {
            if (err) throw err
        }
    )

    res.status(201).json(allStocks)
})

router.post('/byPrice', (req, res) => {
    let sortedStocks = allStocks.filter(stock => parseFloat(stock.price) >= parseFloat(req.body.minPrice))
    req.body.descending ? 
        sortedStocks.sort((a, b) => parseFloat(b.price) - parseFloat(a.price)) :
        sortedStocks.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))

    res.json(sortedStocks)
})


module.exports = router