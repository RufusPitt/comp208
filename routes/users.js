//middleware to handle operations relating to users on database

const { Router } = require('express')
const db = require('../database')

const router = Router()


//get a list of all users
//e.g: http://localhost:8000/api/users
    router.get("/", (req, res, next) => {
        var sql = "select * from user"
        var params = []
        db.all(sql, params, (err, rows) => {
            if (err) {
            res.status(400).json({"error":err.message});
            return;
            }
            res.json({
                //"message":"success",
                //"data":rows
                rows
            })
        });
    });

module.exports = router