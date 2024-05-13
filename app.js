require("dotenv").config();
const express = require('express');
const morgan = require("morgan");

const { connectDB } = require("./src/database/connection");
const userRoute = require("./src/routes/userRoute");
const employeeRoute = require("./src/routes/employeeRoute")

const app = express()
const port = Number(process.env.PORT || 8000);

connectDB();

app.get('/', (req, res, next) => {
  res.status(200).json({ message: 'Hello World!' })
})

app.use(express.json());
app.use(morgan("dev"));

app.use('/api/v1', userRoute);
app.use('/api/v1', employeeRoute);

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})