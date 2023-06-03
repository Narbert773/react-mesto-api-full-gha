const usersRouter = require('express').Router();
const { getUserByIdValid, updateAvatarValid, updateUserValid } = require('../middlewares/validation');
const {
  getUsers, getUser, getUserById, createUser, updateUser, updateAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUser);
usersRouter.get('/:userId', getUserByIdValid, getUserById);
usersRouter.post('/', createUser);
usersRouter.patch('/me', updateUserValid, updateUser);
usersRouter.patch('/me/avatar', updateAvatarValid, updateAvatar);

module.exports = usersRouter;
