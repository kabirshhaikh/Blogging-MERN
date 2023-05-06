const express = require('express');
const router = require('./Routes/routes');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const sequelize = require('./Util/database');
const User = require('./Models/User');
const Blog = require('./Models/Blog');


app.use(bodyParser.json());
app.use(cors());
app.use(router);


sequelize.sync({ force: false })
    .then(() => {
        app.listen(9000, () => {
            console.log("Server running at port 9000");
        })
    })
    .catch((error) => {
        console.log(error);
    });