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
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        steamID: req.body.steamID,
        username: req.body.username,
        //password : md5(req.body.password)
    }
    var sql ='INSERT INTO user (steamID, username) VALUES (?,?)'
    var params = [data.steamID, data.username]
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