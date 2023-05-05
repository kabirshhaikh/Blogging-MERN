const express = require('express');
const router = express.Router();
const userController = require('../Controller/User-Controller');
const jwtAuthenticationMiddleWear = require('../Middlewear/jwt-token');

router.post('/register-user', userController.registerUser);
router.get('/get-all-users', jwtAuthenticationMiddleWear, userController.getAllUsers);
router.post('/login', userController.userLogin);


module.exports = router;