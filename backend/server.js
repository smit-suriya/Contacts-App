const express = require("express");
const dotenv = require("dotenv");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");

dotenv.config();
require("./config/connectDb").connectDb();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/contacts", require("./Routes/contactRoutes"));
app.use("/api/users", require("./Routes/userRoutes"));
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, "127.0.0.1", () => {
  console.log(`Server started on port number ${port}`);
});
