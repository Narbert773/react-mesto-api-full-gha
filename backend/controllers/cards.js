const Card = require('../models/card');
const ForbiddenError = require('../errors/forbiddenError');
const NotFoundError = require('../errors/notFoundError');
const RequestError = require('../errors/requestError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new RequestError('Неверные данные для создания карточки'));
      }
      return next(err);
    });
};

const deleteCard = (req, res, next) => {
  const presentUserId = req.user._id;
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      const ownerId = card.owner.toString();
      if (ownerId !== presentUserId) {
        throw new ForbiddenError('Вы не можете удалить данную карточку');
      }
      return card;
    })
    .then((card) => Card.deleteOne(card))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new RequestError('Неверные данные для создания карточки'));
      }
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Карточка по данному _id не найдена'));
      }
      return next(err);
    });
};

const addLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка по данному _id не найдена');
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new RequestError('Неверные данные для создания карточки'));
      }
      return next(err);
    });
};

const removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка по данному _id не найдена');
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new RequestError('Неверные данные для создания карточки'));
      }
      return next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
};
