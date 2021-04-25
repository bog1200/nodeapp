const sqlite3 = require("sqlite3");
let db = new sqlite3.Database('../nodebot.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('[SQLite] Connected to database.');
  });
function query(query)
{
    return new Promise((resolve, reject) => {
        db.all(query,[],(err, rows ) => {
        if (err) reject(err);
        else resolve(rows);   
    });
})

}
function escape(query)
{
    return query;
}

  // close the database connection
function end()
{
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });
}
module.exports.query=query;
module.exports.end=end;
module.exports.escape=escape;