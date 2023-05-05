const Sequeslize = require('sequelize');
require('dotenv').config();


const sequelize = new Sequeslize('Blogging-MERN', 'root', 'Kabir@123', {
    dialect: 'mysql',
    host: 'localhost'
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((err) => {
        console.log('Unable to connect to the database', err);
    });

module.exports = sequelize;