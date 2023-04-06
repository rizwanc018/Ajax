const express = require('express')
const app = express()
const port = 3000
// const { products } = require('./data')
const orders  = require('./data')
var morgan = require('morgan')
const cors = require('cors');


app.use(morgan('dev'))
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
    console.log(`Listening on port : ${port}`);
})

app.get('/orders', (req, res) => {
    res.status(200).json(orders)
})
app.post('/orders', (req, res) => {
    console.log(req.body);
    res.send(req.body)
})

app.delete('/orders/:id', (req, res) => {
    res.status(200).send(true)
})