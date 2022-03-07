//middleware to handle operations relating to user on database

const { Router } = require('express')
const db = require('../database')
const router = Router()

//get a specific user by steamID
//e.g: http://localhost:8000/api/user/001
router.get("/:steamID", (req, res, next) => {
    var sql = "select * from user where steamID = ?"
    var params = [req.params.steamID]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});

//create new user by inserting data in json format
router.post("/", (req, res, next) => { //restrict only to post commands
    var errors=[]
    if (!req.body.steamID){
        errors.push("No steamID specified");
    }
    if (!req.body.username){
        errors.push("No username specified");
    }
    if (!req.body.rank){
        errors.push("No rank specified");
    }
    if (!req.body.total_kills){
        errors.push("No total_kills specified");
    }
    if (!req.body.total_deaths){
        errors.push("No total_deaths specified");
    }
    if (!req.body.total_won){
        errors.push("No total_won specified");
    }
    if (!req.body.total_lost){
        errors.push("No total_lost specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        steamID: req.body.steamID,
        username: req.body.username,
        rank: req.body.rank,
        total_kills: req.body.total_kills,
        total_deaths: req.body.total_deaths,
        total_won: req.body.total_won,
        total_lost: req.body.total_lost
        //password : md5(req.body.password)
    }
    var sql ='INSERT INTO user (steamID, username, rank, total_kills, total_deaths, total_won, total_lost) VALUES (?,?,?,?,?,?,?)'
    var params = [data.steamID, data.username, data.rank, data.total_kills, data.total_kills, data.total_won, data.total_lost]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            //"id" : this.lastID
        })
    });
})

//update username of existing user
//e.g. http://localhost:8000/api/user/000
//with json for updated username
router.patch("/:steamID", (req, res, next) => {
    var data = {
        username: req.body.username
    }
    var sql =  `UPDATE user SET 
    username = COALESCE(?,username)
    WHERE steamID == ?`
    var params = [data.username, req.params.steamID]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
        })
    });
})


module.exports = router