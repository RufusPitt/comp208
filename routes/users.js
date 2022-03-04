const { Router } = require('express')
const db = require('../database')

const router = Router()

router.get('/', (req, res) => {
    res.send(200)
});

router.get('/games', (req,res) => {
    res.json({ route: 'Games' })
})

module.exports = router