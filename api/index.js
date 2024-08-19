const express = require('express');
const app = express();
const port = 3001;
const corsURL = `http://${process.env.NODE_IP}:5174`
const mysql = require("mysql2")

const db = mysql.createConnection({
  user: `${process.env.DB_USER}`,
  host: `${process.env.NODE_IP}`,
  password: `${process.env.DB_PASS}`,
  database: `${process.env.DB_NAME}`,
  port: 3306
})


app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", corsURL);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTION"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

db.connect(function(err) {
  if (err) throw err;
  console.log('Connected');
});

//get api
app.get('/api/v1/todoitems', (req, res) => {

  console.log("get api is called")
  console.log(req.body)

  const query = "SELECT * FROM todos"
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving data from database")
    } else {
      res.status(200).json(result)
    }
  })
  // db.end()
});

// // post api
app.post("/api/v1/todoitems", (req, res) => {
  const title = req.body.title
  const id = req.body.id
  const completed = req.body.completed
  const deleted = req.body.deleted

  console.log("post api is called")
  console.log(req.body)

  const query = "INSERT INTO todos (id, title, completed, deleted) VALUES (? , ? , ? , ?)"
  db.query(query, [id, title, completed, deleted] ,(err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send({ error: "Error inserting data into database"})
    } else {
      res.status(200).json({ message: "Todo inserted" })
    }
  })
})

// // put api
app.put("/api/v1/todoitems/:id", (req, res) => {
  const id = req.params.id
  const title = req.body.title
  const completed = req.body.completed
  const deleted = req.body.deleted

  console.log("put api is called")
  console.log(req.body)

  const query = "UPDATE todos SET title = ? , completed = ? , deleted = ? WHERE id = ?"
  db.query(query, [title, completed, deleted, id] , (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error updating data in database")
    } else {
      res.status(200).send(result)
    }
  })
})

// // delete api
app.delete("/api/v1/todoitems/:id", (req, res) => {
  const id = req.params.id

  console.log("delete api is called")
  console.log(req.body)

  const query = "DELETE FROM todo WHERE id = ?"
  db.query(query, [id], (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send("Error deleting data from database")
    } else {
      res.status(200).send("Todo deleted")
    }
  })
})

app.listen(port, () => {
    console.log(`Example app listenig on port ${port}`);
})