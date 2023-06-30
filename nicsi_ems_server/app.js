const dotenv = require("dotenv/config");
const express = require("express");
const path = require("path");
const apiRouter = require("./routes/api");
const webRouter = require("./routes/web");
const morgan = require("morgan");
const cross = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "10mb" }));

app.use("/", express.static(path.join(__dirname, "../public")));

app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(morgan("common"));

app.use("/api/v1", apiRouter);
app.use(webRouter);

app.use(cross);

app.listen(PORT, () => {
    console.log(`Server is Listening on: ${PORT}`);
});

process.on("uncaughtException", (err) => {
    console.log(`Uncaught Exception: ${err.message}`);
});
process.on("unhandledRejection", (err, promise) => {
    console.log("Unhandled rejection at ", promise, `reason: ${err.message}`);
});

module.exports = app;
