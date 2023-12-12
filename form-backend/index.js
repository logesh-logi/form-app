const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config(); // environment variables using dotenv
const Pool = require("pg").Pool; // For postgresql connection

const app = express();

const pool = new Pool({
  user: process.env.USERNAME,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
});

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const getUsers = (request, response) => {
  pool.query("SELECT * FROM employees", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createUser = (request, response) => {
  const {
    firstName,
    lastName,
    designation,
    department,
    email,
    salary,
    phoneNumber,
    dob,
    joinDate,
  } = request.body;
  // console.log(request.body);
  pool.query(
    "INSERT INTO employees (firstName,lastName, designation, department,email,salary,phoneNumber,dob,joinDate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ",
    [
      firstName,
      lastName,
      designation,
      department,
      email,
      salary,
      phoneNumber,
      dob,
      joinDate,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send("Added successfully...");
    }
  );
};

app.get("/api/getEmp", (req, res) => {
  getUsers(req, res);
});

app.post("/api/newEmp", (req, res) => {
  createUser(req, res);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
