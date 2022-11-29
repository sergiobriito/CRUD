const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv').config();
PORT = process.env.PORT || 5000

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./routes/userRoutes'));

app.listen(PORT, () => {
  console.log(`Servidor em execução - ${PORT}`);
});
