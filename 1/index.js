const express = require("express");
const cors = require("cors");
const productRoutes = require('./Router/ProductRoutes/productRoutes');
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use("/",productRoutes);

app.listen(port, () => {
  console.log("Server established at port:", port);
});
