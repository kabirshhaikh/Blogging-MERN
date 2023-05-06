const express = require('express');
const { Sequelize } = require('sequelize');
const sequelize = require('../Util/database');

const Token = sequelize.define('token', {
    tokenId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    tokenNumber: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    tokenUserId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    tokenIssuedAt: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    tokenExpiresAt: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Token.sync()
    .then(() => {
        console.log("Token table created");
    })
    .catch((error) => {
        console.log(error);
    })

module.exports = Token;