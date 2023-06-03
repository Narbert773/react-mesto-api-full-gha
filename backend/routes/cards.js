const cardsRouter = require('express').Router();
const { createCardValid, cardCheckValid } = require('../middlewares/validation');
const {
  getCards, createCard, deleteCard, addLike, removeLike,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCardValid, createCard);
cardsRouter.delete('/:cardId', deleteCard);
cardsRouter.put('/:cardId/likes', cardCheckValid, addLike);
cardsRouter.delete('/:cardId/likes', removeLike);

module.exports = cardsRouter;
