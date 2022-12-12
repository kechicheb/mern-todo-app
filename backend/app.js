const express = require("express");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/taskRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");
// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb://localhost:27017/express";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(4000))
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(bodyParser.json());
app.use(cors());
// remove comment when project in production
// app.use(
//   cors({
//     origin: ["http://localhost:3000", "your domain name"],
//   })
// );

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// blog routes
app.use("/tasks", taskRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
