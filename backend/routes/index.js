const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const incorrectPath = require('./incorrectPath');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('/*', incorrectPath);

module.exports = router;
