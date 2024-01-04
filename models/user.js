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
      User.hasMany(models.Product, {foreignKey: 'authorId'});
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
          msg: 'Email cannot empty'
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
          msg: 'Password cannot empty'
        },
        notEmpty: {
          msg: 'Password cannot empty'
        },
        minCharStr(value){
          if (value.length < 5){
            throw 'Minimum 5 Characters'
          }
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
          msg: 'Phone number cannot empty'
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
          msg: 'Address cannot empty'
        },
        notEmpty: {
          msg: 'Address cannot empty'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (instance) => {
        instance.password = hashPass(instance.password);
      }
    },
    sequelize,
    modelName: 'User',
  });

  return User;
};