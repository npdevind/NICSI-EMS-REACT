const express = require("express");
const jwt = require("jsonwebtoken");
const authQuery = require("../models/authModel")
const { secret } = require("../features/index")

exports.jwtMiddleware = async (req, res, next) => {
    // getting the bear token header
    const authHeader = req.headers["authorization"];
    // getting the actual token
    const token = (authHeader && authHeader.split(" ")[1]) || "";
    // check the token is present or not
    if (token === null) return res.status(401).json({ message: "Token not found" });

    // verify the token
    jwt.verify(token, secret.JWT_TOKEN_SECRET, async (err, data) => {
        if (err) return res.status(403).json({ message: "Unauthenticated" });

        const userDetails = await authQuery.userDetails({ email: data.email });

        if (!userDetails) return res.status(403).json({ message: "Unauthenticated" });
        req.user = {
            id: userDetails?.uid,
            email: userDetails?.email,
            name: userDetails?.name,
            type: userDetails?.type,
        };
        return next();

    });
};