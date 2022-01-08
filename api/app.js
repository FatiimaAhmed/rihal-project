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

//get students list
app.get("/getStudents", (req, res) => {
  let sql = `SELECT student_id, name, date_of_birth, class_name, country_name 
  FROM students 
  INNER JOIN classes 
  INNER JOIN countries 
  ON (classes.id = students.class_id) and (countries.id = students.country_id)`;
  db.all(sql, (err, row) => {
    if (err) {
      throw err;
      // console.log(err);
    }

    res.json(row);
  });
});

//get class list
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

//get country list
app.get("/getCountries", (req, res) => {
  let sql = `SELECT * FROM countries`;
  db.all(sql, (err, row) => {
    if (err) {
      throw err;
    }

    res.json(row);
  });
});

//add new student
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

//add new class
app.post("/addClass", (req, res) => {
  let params = req.body.name;
  let sql = "INSERT INTO classes (class_name) VALUES (?)";
  db.run(sql, params, (err) => {
    if (err) {
      res.json(err);
      throw err;
    }

    res.json("class added successfully");
  });
});

//add new country
app.post("/addCountry", (req, res) => {
  let params = req.body.name;
  let sql = "INSERT INTO countries (country_name) VALUES (?)";
  db.run(sql, params, (err) => {
    if (err) {
      res.json(err);
      throw err;
    }

    res.json("country added successfully");
  });
});

//edit student
app.post("/editStudent/:id", (req, res) => {
  console.log(req.body);
  let id = req.params.id;
  let params = [
    Number(req.body.class),
    Number(req.body.country),
    req.body.name,
    req.body.birthday,
  ];
  let sql = `UPDATE students SET (class_id, country_id, name, date_of_birth) = (?, ?, ?, ?) WHERE student_id = ${id}`;
  db.run(sql, params, (err) => {
    if (err) {
      res.json(err);
      throw err;
    }

    res.json(`student with id ${id} updated successfully`);
  });
});

//delete student
app.post("/deleteStudent/:id", (req, res) => {
  let id = req.params.id;
  let sql = "DELETE FROM students WHERE student_id = ?";
  db.run(sql, id, (err) => {
    if (err) {
      res.json(err);
      throw err;
    }

    res.json(`student with id ${id} is deleted`);
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
