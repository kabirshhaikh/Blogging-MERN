const { Sequelize } = require('sequelize');
const sequelize = require('../Util/database');

const User = sequelize.define('user', {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    userFirstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userLastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userEmail: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userPassword: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

User.sync()
    .then(() => {
        console.log("User table created");
    })
    .catch((error) => {
        console.log(error);
    });

module.exports = User;