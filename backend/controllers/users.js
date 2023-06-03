const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../errors/conflictError');
const NotFoundError = require('../errors/notFoundError');
const RequestError = require('../errors/requestError');

const findUser = (id, res, next) => {
  User.findById(id)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Пользователь по указанному id не найден.'));
      }
      return next(err);
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUser = (req, res, next) => findUser(req.user._id, res, next);

const getUserById = (req, res, next) => findUser(req.params.userId, res, next);

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((newUser) => {
      const removePasswordUser = newUser.toObject({ useProjection: true });

      res.status(201).send(removePasswordUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new RequestError('Неверные данные для создания пользователя'));
      }
      if (err.code === 11000) {
        return next(new ConflictError('Пользователь с указанным email уже зарегистрирован'));
      }
      return next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по данному _id не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new RequestError('Неверные данные для создания пользователя'));
      }
      return next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по данному _id не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new RequestError('Неверные данные для создания пользователя'));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' });
      return res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  login,
};
