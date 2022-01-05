const express = require("express");
const sqlite = require('sqlite3').verbose();
const cors = require("cors");


const app = express();
let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}

//middleware & static files
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//connect to db
let db = new sqlite.Database('./db/rihal.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to SQlite database.');
    app.listen(port, () => console.log(`app listening on port ${port}`));
});

app.get("/", (req, res) => {
    res.send('hey there 😉');
})

app.post("/addStudent", (req, res) => {
    console.log(req.body);
    res.json('student added successfully')
});


// close db
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
});