const express = require("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");

// Import routes

dotenv.config({ path: "./.env" });
const app = express();
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended: false })); //mendapat data dari form
app.use(express.json()); //mengirimkan data dalam format JSON

// Connect to the MySQL Database
app.set("view engine", "hbs");
db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("MySQL Connected...");
  }
});

// Define Routers

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));

app.listen(5006, () => {
  console.log("Server Jalan Anjay");
});
