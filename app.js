const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const teamsRouter = require("./routes/teams");
const usersRouter = require("./routes/users");
const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/teams", teamsRouter);
app.use("/api/users", usersRouter);

app.use(errorHandlerMiddleware);

module.exports = app;