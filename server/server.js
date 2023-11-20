import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const details = [
    {
        id : 1,
        name : "Prashik",
        username : "yash",
        password : "yash"
    },
    {
        id : 2,
        name : "Shrirang",
        username : "shi",
        password : "123"
    }
]

const server = express();
const port = 8000;

server.use(cors());
server.use(bodyParser.urlencoded({ extended : true }));
server.use(bodyParser.json());

server.get("/", (req, res) => {
    res.json({
        message : 'Hello, from Server!'
    });
});

server.post("/submit", (req, res) => {
    const result = req.body;
    let found = false;
    details.forEach((detail) => {
        if (detail.username == result.username) {
            if (detail.password == result.password) {
                found = true;
                res.json(detail);
            }
        }
    });
    if (found == false) {
        res.sendStatus(404);
    }
}); 

server.listen(port, () => {
    console.log(`Server is running on ${port}.`);
});