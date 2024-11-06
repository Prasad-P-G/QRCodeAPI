const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db/conn");
const router = require("./routers");

const app = express();
const port = process.env.PORT || 8080;

// to specific
// app.use(
//     cors({
//       origin: process.env.FRONT_END_URL,
//       credentials: true,
//     })
//   );

//for all
app.use(cors());

app.use(express.json());

//testing
app.get("/", async (req, res) => {
  res.send("Testing root node..");
});

app.use("/api", router);

connectDB().then(() => {
  try {
    app.listen(port, () => {
      console.log("Connected to DB....");
      console.log(`Port:${port} started! Server is running..`);
    });
  } catch (error) {
    console.log(error);
  }
});

// app.listen(port, () => {
//   console.log("Server is available & Live...on ", port);
// });
