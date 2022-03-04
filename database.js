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
        });  
    }
});


module.exports = db