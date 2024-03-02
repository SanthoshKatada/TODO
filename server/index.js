const express = require("express");
const router = require("./routes/routes");
const dbConnect = require("./config/dbConfig");
const dotenv = require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT || 8080;
const app = express();

dbConnect();
app.use(cors());
app.use(express.json());
app.use("/routes", router);

app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
