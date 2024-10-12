const express = require("express");
const dotenv = require("dotenv");
const certificateRoutes = require("./routes/certificateRoutes");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello Express...!",
  });
});

app.use("/api/v1/certificate", certificateRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port " + process.env.PORT);
});
