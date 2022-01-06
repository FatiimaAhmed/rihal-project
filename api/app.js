const express = require("express");
const sqlite = require("sqlite3").verbose();
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
let db = new sqlite.Database("./db/rihal.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to SQlite database.");
  app.listen(port, () => console.log(`app listening on port ${port}`));
});

app.get("/", (req, res) => {
  res.send("hey there 😉");
});

app.get("/getStudents", (req, res) => {
  let sql = `SELECT * FROM students`;
  db.all(sql, (err, row) => {
    if (err) {
      throw err;
      //   console.log(err);
    }

    res.json(row);
    // closeDB();
  });
});

app.get("/getClasses", (req, res) => {
  let sql = `SELECT * FROM classes`;
  db.all(sql, (err, row) => {
    if (err) {
      throw err;
      //   console.log(err);
    }

    res.json(row);
    // closeDB();
  });
});

app.get("/getCountries", (req, res) => {
  let sql = `SELECT * FROM countries`;
  db.all(sql, (err, row) => {
    if (err) {
      throw err;
      //console.log(err);
    }

    res.json(row);
    // closeDB();
  });
});

app.post("/addStudent", (req, res) => {
  console.log(req.body);
  let params = [
    Number(req.body.class),
    Number(req.body.country),
    req.body.name,
    req.body.birthday,
  ];

  let sql = `INSERT INTO students (class_id, country_id, name, date_of_birth) VALUES (?, ?, ?, ?)`;

  db.run(sql, params, (err) => {
    if (err) {
      throw err;
    }

    res.json("student added successfully");
  });
});

//close db
function closeDB() {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
  });
}
