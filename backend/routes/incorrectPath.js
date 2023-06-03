const NotFoundError = require('../errors/notFoundError');

const incorrectPath = (req, res, next) => next(new NotFoundError('Страница не найдена'));

module.exports = incorrectPath;
