var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const routes = require("./routes");
require("dotenv").config();

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Backend Server</title>
        <style>
            body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                font-family: Arial, sans-serif;
                background: linear-gradient(135deg, #1fa2ff, #12d8fa, #a6ffcb);
                color: #fff;
            }
            .container {
                text-align: center;
                padding: 20px;
                background-color: rgba(0, 0, 0, 0.5);
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            }
            h1 {
                font-size: 48px;
                margin: 0;
                text-transform: uppercase;
            }
            p {
                font-size: 18px;
                margin: 10px 0 0;
            }
            .button {
                margin-top: 20px;
                padding: 10px 20px;
                font-size: 16px;
                color: #fff;
                background-color: #007BFF;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                text-decoration: none;
                transition: background-color 0.3s ease;
            }
            .button:hover {
                background-color: #0056b3;
            }
            .info {
                margin-top: 20px;
                font-size: 14px;
                color: #ccc;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Backend Server</h1>
            <p>Welcome to the backend server of the Todo Node Project!</p>
            <div class="info">
                <p>Server is running on port: ${process.env.port}</p>
                <p>Environment: ${process.env.NODE_ENV || "development"}</p>
            </div>
            <p><a href="https://github.com" target="_blank" class="button">Visit My GitHub</a></p>
        </div>
    </body>
    </html>
  `);
});

app.use("/api/v1", routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
