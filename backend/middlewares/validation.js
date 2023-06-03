const { celebrate, Joi } = require('celebrate');

const avatarRegExp = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9\-._~:/?#\\[\]@!\\$&'()*+,;=]+(#)?$/;

const createUserValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(avatarRegExp),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const loginValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const getUserByIdValid = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
});

const updateAvatarValid = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(avatarRegExp),
  }),
});

const updateUserValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const createCardValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(avatarRegExp),
  }),
});

const cardCheckValid = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  createUserValid,
  loginValid,
  getUserByIdValid,
  updateAvatarValid,
  updateUserValid,
  createCardValid,
  cardCheckValid,
};
