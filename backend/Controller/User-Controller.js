const express = require('express');
const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Token = require('../Models/Token');
const cookieParser = require('cookie-parser');
const JWT_SECRET = '90ece9d7534d8ed3c573679ffde8f97b17ef15faf153a8f3ec15bc8e3781797af4ad46570f8a0035a43b43bcff47885bb7dffb39a3ae313e78988c79da3528b7';

//Controller Functions:

//Register User Function Start:
const registerUser = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    //Hash the password:
    const pass = password;
    const saltRound = 10;
    const salt = bcrypt.genSaltSync(saltRound);
    const hashedPassword = bcrypt.hashSync(pass, salt);
    //Check if the user exists:
    let existingUser;
    try {
        existingUser = await User.findOne({
            where: {
                userEmail: email
            }
        });
    }
    catch (error) {
        console.log(error);
    }
    if (existingUser) {
        return res.status(403).json({ message: "User already exists" });
    }
    else {
        let newUser;
        try {
            newUser = await User.create({
                userFirstName: firstName,
                userLastName: lastName,
                userEmail: email,
                userPassword: hashedPassword
            });
        }
        catch (error) {
            console.log(error);
        }
        if (!newUser) {
            return res.status(401).json({ message: "Unable to create a new user" });
        }
        else {
            return res.status(201).json({ message: "Created new user", userData: newUser });
        }
    }
}
//Register User Function End:


//Get All User Function Start:
const getAllUsers = async (req, res, next) => {
    // let allUsers;
    // try {
    //     allUsers = await User.findAll();
    // }
    // catch (error) {
    //     console.log(error);
    // }
    // if (!allUsers) {
    //     return res.status(404).json({ message: "No users found" });
    // }
    // else {
    //     return res.status(200).json({ message: "All registered users found", data: allUsers });
    // }

    const User = req.user;

    if (!User) {
        return res.status(404).json({ message: "Invalid JWT token and no users found" });
    }
    else {
        return res.status(201).json({ message: "User Authorised to see the registered users", data: User });
    }

}
//Get All User Function End:

//Login User Function Start:
const userLogin = async (req, res, next) => {
    const { email, password } = req.body;
    let user;
    try {
        user = await User.findOne({
            where: {
                userEmail: email,
            }
        });
    }
    catch (err) {
        console.log(err);
    }
    if (!user) {
        return res.status(404).json({ message: "Unable to find user, enter correct credentials or register yourself" });
    }
    else {
        const correctPassword = await bcrypt.compare(password, user.userPassword);
        if (user.userEmail === email && correctPassword == true) {
            //Create JWT Token:
            const payload = {
                userId: user.userId
            }
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
            const decodedToken = jwt.decode(token);
            console.log(decodedToken);


            let tokenDetails;
            try {
                tokenDetails = await Token.create({
                    tokenNumber: token,
                    tokenUserId: decodedToken.userId,
                    tokenIssuedAt: decodedToken.iat,
                    tokenExpiresAt: decodedToken.exp

                });
            }
            catch (error) {
                console.log(error);
            }

            if (!tokenDetails) {
                return res.status(403).json({ message: "Unable to store token details" });
            }
            else {
                res.cookie('token', token, {
                    httpOnly: true
                });
                return res.status(200).json({ message: "User Logged In", token: token, storedToken: tokenDetails })
            }
        }
        else {
            return res.status(403).json({ message: "Incorrect credentials" });
        }
    }
}
//Login User Function end:

//Logout user function start:

const logoutUser = async (req, res, next) => {
    const userId = req.user.dataValues.userId;
    let loggedInUser;
    try {
        loggedInUser = await Token.findOne({
            where: {
                tokenUserId: userId
            }
        });
    }
    catch (error) {
        console.log(error);
    }

    if (!loggedInUser) {
        return res.status(404).json({ message: "No user found with token" });
    }

    let deleteToken;
    try {
        deleteToken = await Token.destroy({
            where: {
                tokenUserId: userId
            }
        });
    }
    catch (error) {
        console.log(error);
    }

    if (!deleteToken) {
        return res.status(403).json({ message: "Unable to delete the token" });
    }
    else {
        return res.status(200).json({ message: "Token deleted sucessfully" });
    }

}

//Logout user function end:




module.exports = {
    registerUser,
    getAllUsers,
    userLogin,
    logoutUser
}