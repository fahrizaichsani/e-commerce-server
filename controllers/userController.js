const { User } = require("../models");

class UserController {
  static async register(req, res, next) {
    try {
      const user = await User.create(req.body);
      res.status(201).json({
        message: 'Register Success',
        id: user.id,
        email: user.email
      })
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res) {
    try {

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}

module.exports = UserController
