const express = require("express");
const routes = require("./Routes/route");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server Running on http://localhost:${port}`);
});

app.use("/", routes);
