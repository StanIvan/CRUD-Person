require("dotenv").config(); //using .env file we save our server parameters private
const express = require("express");
const mongoose = require("mongoose");
const personRoutes = require("./routes/persons");

//express app
const app = express();

//middleware
app.use(express.json()); //used to request for body (req.body) when we post or patch document
app.use((req, res, next) => {
  console.log(req.path, req.method);
  res.header("Access-Control-Allow-Origin", "*"); // Allow any origin
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/persons", personRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listening for requests(SERVER)[we start listening to a requests once we are connected to a database with mongooses]
    app.listen(process.env.PORT, () => {
      console.log("Connected to db & listening on port 4000!");
    });
  })
  .catch((error) => {
    console.log(error);
  });
