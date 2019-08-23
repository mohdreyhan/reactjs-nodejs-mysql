var express = require("express");
var app = express();

const bodyParser = require("body-parser");
const mysql = require("mysql");

const cors = require("cors");
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodejs_test"
});

app.get("/posts", function(res) {
  connection.query("select * from data", function(error, results) {
    if (error) throw error;
    res.send(results);
  });
});

app.post("/updateposts", function(req, res) {
  console.log("data ::", req.body);
  const recordToUpdate = req.body;
  connection.query(
    "UPDATE data SET Invoices_Company = ? , Invoices_Date = ? , Invoices_Cost = ? , Invoices_Discount = ?  WHERE Invoices_Id = ?",
    [
      recordToUpdate.Invoices_Company,
      recordToUpdate.Invoices_Date,
      recordToUpdate.Invoices_Cost,
      recordToUpdate.Invoices_Discount,
      recordToUpdate.Invoices_Id
    ]
  );
  res.send({
    message: "record updated successfully",
    recordUpdated: recordToUpdate // need to review
  });
});

app.listen(3000, () => {
  console.log("Go to http://localhost:3000/posts to see posts");
});
