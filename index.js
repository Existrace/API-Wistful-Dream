const express = require('express')
const app = express()
const port = 8080

const dream_model = require('./wistful_dream_model')

app.use(express.json())
/*app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});*/

app.get('/', (req, res) => {
    dream_model.getDreams()
        .then(response => {
            res.status(200).send(response)
        })
        .catch(error => {
            res.status(500).send(error)
        })
})

app.post('/dreams', (req, res) => {
    dream_model.createDreams(req.body)
        .then(response => {
            res.status(200).send(response)
        })
        .catch(error => {
            res.status(500).send(error)
        })
})


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
