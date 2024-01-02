'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require('../helper/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product);
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Email must be unique'
      },
      validate: {
        notNull: {
          msg: 'Email cannot null'
        },
        notEmpty: {
          msg: 'Email cannot empty'
        },
        isEmail: {
          msg: 'Formated email required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password cannot null'
        },
        notEmpty: {
          msg: 'Password cannot empty'
        },
        len: {
          args: 5,
          msg: 'Minimal 5 characters'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'Staff'
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Phone number cannot null'
        },
        notEmpty: {
          msg: 'Phone number cannot empty'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Address cannot null'
        },
        notEmpty: {
          msg: 'Address cannot empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};