const sqlite = require('sqlite3').verbose();

//connect to db
let db = new sqlite.Database('./db/rihal.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to SQlite database.');
});


// close db
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
});