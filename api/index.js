const express = require('express');
const app = express();
const port = 3306;

var data = [
    {
        id: 1,
        name: "test1",
        done: false,
    },
    {
        id: 2,
        name: "test2",
        done: "true",
    }
];

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTION"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

app.get("/", (req, res) => {
    res.send(data);
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
