const express = require('express');
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const JWT_SECRET = '90ece9d7534d8ed3c573679ffde8f97b17ef15faf153a8f3ec15bc8e3781797af4ad46570f8a0035a43b43bcff47885bb7dffb39a3ae313e78988c79da3528b7';


const authenticateJWTToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(404).json({ message: "Missing authentication token" })
    }
    else {
        let user;
        try {
            const decode = jwt.verify(token, JWT_SECRET);
            user = await User.findOne({
                userId: decode.userId
            });
        }
        catch (error) {
            console.log(error);
        }
        if (!user) {
            return res.status(403).json({ message: "Invalid Authentication Token" });
        }
        else {
            //Store user information in req.user:
            req.user = user;
            next();
        }

    }
}

module.exports = authenticateJWTToken;