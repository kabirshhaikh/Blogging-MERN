const { Sequelize } = require('sequelize');
const sequelize = require('../Util/database');


const Blog = sequelize.define('blog', {
    blogId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    blogTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    blogContent: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    blogAuthor: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Blog.sync()
    .then(() => {
        console.log('Blog table created');
    })
    .catch((err) => console.log(err));

module.exports = Blog;