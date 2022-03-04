var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{

        console.log('Connected to the SQLite database.')
        db.run(`
            CREATE TABLE user (
                steamID text PRIMARY KEY,
                username text
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insertUser = 'INSERT INTO user (steamID, username) VALUES (?,?)'
                //db.run(insert, ["admin","admin@example.com",md5("admin123456")])
                //db.run(insert, ["user","user@example.com",md5("user123456")])
                db.run(insertUser, ["000", "username1"])
                db.run(insertUser, ["001", "username2"])
            }
        });

        db.run(`
            CREATE TABLE matches (
                matchID text PRIMARY KEY,
                map text,
                winner text,
                datetime text
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                //datetime format "YYYY-MM-DD HH:MM:SS.SSS"
                var insertMatches = 'INSERT INTO matches (matchID, map, winner, datetime) VALUES (?,?,?,?)'
                db.run(insertMatches, ["M01", "map1", "Blue team", "2016-01-01 10:20:05.123"])
                db.run(insertMatches, ["M02", "map2", "Red team", "2016-03-01 10:20:05.123"])
                db.run(insertMatches, ["M03", "map1", "Blue team", "2016-04-01 10:20:05.123"])
                db.run(insertMatches, ["M04", "map2", "Red team", "2016-05-01 10:20:05.123"])
            }
        });

        /*db.run(`
            CREATE TABLE matchsummary (
                matchID text SECONDARY KEY,
                steamID text SECONDARY KEY,
                totalkills INTEGER,
                totaldeaths INTEGER,
                score INTEGER,
                team text
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                //datetime format "YYYY-MM-DD HH:MM:SS.SSS"
                var insertMatches = 'INSERT INTO matches (matchID, steamID, totalkills, totaldeaths, score, team) VALUES (?,?,?,?,?,?)'
                db.run(insertMatches, ["M01", "map1", "Blue team", "2016-01-01 10:20:05.123"])
            }
        });*/

        /*db.run(`
            CREATE TABLE matches (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                winner text
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insertMatches = 'INSERT INTO matches (winner) VALUES (?)'
                db.run(insertMatches, ["Blue team"])
                db.run(insertMatches, ["Red team"])
            }
        });*/
    }
});


module.exports = db