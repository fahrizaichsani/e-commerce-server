const { comparePass } = require("../helper/bcrypt");
const { signToken } = require("../helper/jwt");
const { User } = require("../models");

class UserController {
  static async addUser(req, res, next) {
    try {
      const user = await User.create(req.body);

      res.status(201).json({
        id: user.id,
        username: user.username,
        email: user.email
      })
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      console.log(req.body);
      const { email, password } = req.body

      if (!email) {
        throw { name: 'Email cannot empty' }
      }

      if (!password) {
        throw { name: 'Password cannot empty' }
      }

      const user = await User.findOne({
        where: {
          email: email
        }
      })

      if (!user) {
        throw { name: 'cant login' }
      }

      const checkPassword = comparePass(password, user.password)

      if (!checkPassword) {
        throw { name: 'cant login' }
      }

      const accessToken = signToken({ id: user.id, email: user.email })

      res.status(200).json({ accessToken })

    } catch (error) {
      console.log(error);
      next(error)
    }
  }
}

module.exports = UserController
