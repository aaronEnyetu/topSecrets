const { Router } = require('express');


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
  });
