const express = require('express');
const app = express();
const port = 3306;
// const baseURL = `http://${process.env.NODE_IP}:3306/api/v1/todoitems`
const corsURL = `http://${process.env.NODE_IP}:5174`

var data = [
  {
    id: "1",
    title: "test1",
    completed: false,
    deleted: false,
  },
  {
    id: "2",
    title: "test2",
    completed: true,
    deleted: false,
  },
  {
    id: "3",
    title: "test3",
    completed: true,
    deleted: true,
  },
  {
    id: "4",
    title: "test4",
    completed: false,
    deleted: false,
  },
];

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

// const corsOptions = {
//   origin: corsURL,
//   methods: ['GET', 'PUT'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
// };

// app.use(cors(corsOptions));


app.get('/api/v1/todoitems', (req, res) => {
  res.send(data);
  // console.log("hello world")
});

app.put("/api/v1/todoitems/:id", (req, res) => {
  const id = req.params.id
  const newTodo = req.body
  if (data.some((todo) => todo.id === id)){
    data.map((todo) => {
      if(todo.id === id) {
        todo.title = newTodo.title
        todo.completed = newTodo.completed
        todo.deleted = newTodo.deleted
        res.send("updated todo with id : " + id)
      }
      res.send("unknown error 1")
    })
  } else {
    const newData = [...data, newTodo]
    data = newData
    res.send("added new todo with id : " + id)
  }
  res.send("unknown error 2")
});
