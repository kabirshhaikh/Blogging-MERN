const express = require('express');
const Blog = require('../Models/Blog');
const User = require('../Models/User');

const addBlog = async (req, res, next) => {
    const User = req.user;
    if (!User) {
        return res.status(404).json({ message: "Missing Token/Authorization" });
    }
    else {
        const userId = User.dataValues.userId;
        const { blogTitle, blogContent } = req.body;
        console.log("Blog Title: " + blogTitle + ", blog content: " + blogContent + ", and the user Id is: " + userId);
        let newBlog;
        try {
            newBlog = await Blog.create({
                blogTitle,
                blogContent,
                blogAuthor: userId
            });
        }
        catch (error) {
            console.log(error);
        }

        if (!newBlog) {
            return res.status(401).json({ message: "Unable to create a new blog" });
        }
        else {
            return res.status(200).json({ message: "New blog created", blogData: newBlog });
        }
    }
}

module.exports = {
    addBlog
}