const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const User = require('../models/User');
const authorize = require('../middleware/authorize');
const UserService = require('../services/UserService');



module.exports = Router()

// for creating a new user
  .post('/', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);
      res.json(user);
    } catch (error) {
      next (error);
    }
  })
  //create sign in route
  .post('/sessions', async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const sessionToken = await UserService.signIn({ email, password });

      res.cookie(process.env.COOKIE_NAME, sessionToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,

      })
        .json({ message: 'Sign in succesful!' });
    } catch (error) {
      next(error);
    }
  })
// Returns existing user
  .get('/me', authenticate, (req, res) => {
    res.json(req.user);
  })

//Fetches a list of users provided that the current user is authenticated and authorized as admin

  .get('/', [authenticate, authorize], async (req, res, next) => {
    try{
      const users = await User.getAll();
      res.json(users);
    } catch (error) {
      next (error);
    }
  });
