const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthError = require('../errors/authError');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: false,
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
    },
    about: {
      type: String,
      require: false,
      minlength: [2, 'Минимальная длина поля "about" - 2'],
      maxlength: [30, 'Максимальная длина поля "about" - 30'],
    },
    avatar: {
      type: String,
      require: false,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Введите URL',
      },
    },
    email: {
      type: String,
      required: [true, 'Введите email'],
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: 'Введите корректный email',
      },
    },
    password: {
      type: String,
      select: false,
      required: [true, 'Введите пароль'],
      minlength: [8, 'Минимальная длина пароля - 8'],
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function check(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Неправельные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError('Неправельные почта или пароль');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
