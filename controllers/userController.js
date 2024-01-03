const { comparePass } = require("../helper/bcrypt");
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

  static async login(req, res, next) {
    try {
      const { email, password } = req.body

      if (!email) {
        throw { name: 'Input email' }
      }

      if (!password) {
        throw { name: 'Input password' }
      }

      const checkEmail = await User.findOne({
        where: {
          email: email
        }
      })

      if (!checkEmail) {
        throw { name: 'cant login' }
      }

      const checkPassword = comparePass(password, )


    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController
