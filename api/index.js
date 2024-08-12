const express = require('express');
const app = express();
const port = 3306;

var data = [
    {
        id: 1,
        name: "test1",
        checked: false,
    },
    {
        id: 2,
        name: "test2",
        checked: true,
    },
    {
      id: 3,
      name: "test3",
      checked: false,
  }
];

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://192.168.1.6:5173");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTION"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

app.get("/todolist/api/", (req, res) => {
    res.send(data);
    // console.log("hello world")
});

app.post("/", (req, res) => {
    try {
        data = req.body.name;
        res.json(data);
    } catch (error) {
        console.log(error);
    }
});

app.listen(port, () => {
    console.log(`Example app listenig on port ${port}`);
})
