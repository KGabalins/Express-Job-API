require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

//Extra security package
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
// Conect DB
const connectDB = require("./db/connect");
// Routers
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
// Error handler
const notFoundMiddleware = require("./errors/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
// Middleware
const authenticateUser = require("./middleware/authentication");

const corsOptions = {
  origin: "http://localhost:5173",
};

app.set("truxt proxy", 1);
app.use(
  rateLimiter({
    windowsMs: 15 * 60 * 1000, // 15 mimnutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors(corsOptions));
app.use(xss());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    console.log("Conected to MongoDB successfully...");
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
