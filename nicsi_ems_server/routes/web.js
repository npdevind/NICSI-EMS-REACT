const express = require("express");

const webRouter = express.Router();
const path = require("path");

// all the request come from the server are handled using the react so it will
// point to the build html file of react.
webRouter.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../public", "index.html"));
});

module.exports = webRouter;
