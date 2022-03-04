//redundant at the moment FIX LATER
const { Router } = require('express')

const router = Router()

router.get('/', (req, res) => {
    res.send(200);
})

router.get('/gameID/:ID', (req,res) => {
    res.json({ ID: 'Some game ID' })
})

module.exports = router