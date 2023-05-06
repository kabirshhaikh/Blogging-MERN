const express = require('express');
const router = express.Router();
const userController = require('../Controller/User-Controller');
const blogController = require('../Controller/Blog-Controller');
const jwtAuthenticationMiddleWear = require('../Middlewear/jwt-token');

//User Routes:
router.post('/register-user', userController.registerUser);
router.get('/get-all-users', jwtAuthenticationMiddleWear, userController.getAllUsers);
router.post('/login', userController.userLogin);
router.post('logout', jwtAuthenticationMiddleWear, userController.logoutUser);

//Blog Routes:
router.post('/add-blog', jwtAuthenticationMiddleWear, blogController.addBlog);


module.exports = router;