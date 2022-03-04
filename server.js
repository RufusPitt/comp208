//https://developerhowto.com/2018/12/29/build-a-rest-api-with-node-js-and-express-js/
//can delete index.js ??? and routes +



// Create express app
var express = require("express")
var cors = require('cors')
var app = express()
var db = require("./database.js")
var md5 = require("md5")

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

//get routes:
const usersRoute = require('./routes/users')
const userRoute = require('./routes/user')

//use routes:
app.use('/api/users', usersRoute)
app.use('/api/user', userRoute)

// Server port
var HTTP_PORT = 8000 
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

// Insert here other API endpoints
//get a list of all users
//e.g: http://localhost:8000/api/users
    /*app.get("/api/users", (req, res, next) => {
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
    });*/

//get a specific user by steamID
//e.g: http://localhost:8000/api/user/001
/*app.get("/api/user/:steamID", (req, res, next) => {
    var sql = "select * from user where steamID = ?"
    var params = [req.params.steamID]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            //"message":"success",
            "data":row
        })
      });
});

//create new user by inserting data in json format
app.post("/api/user/", (req, res, next) => { //restrict only to post commands
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
    var params =[data.steamID, data.username]
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
})*/


// Default response for any other request
app.use(function(req, res){
    res.status(404);
});