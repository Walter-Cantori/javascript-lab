const router = require('express').Router();
const requireDir = require('require-dir');

const controllers = requireDir('./controllers');
const authMiddleware = require('./middlewares/auth');


router.post('/signup', controllers.authController.signup);
router.post('/signin', controllers.authController.signin);

router.use(authMiddleware);


router.post('/tweets', controllers.tweetController.create);
router.delete('/tweets/:id', controllers.tweetController.destroy);


router.post('/like/:id', controllers.likeController.toggle);

router.post('/follow/:id', controllers.followController.create);
router.delete('/unfollow/:id', controllers.followController.destroy);

router.put('/users', controllers.usersController.update);
router.get('/users', controllers.usersController.show);
router.get('/users/feed', controllers.usersController.feed);

router.use((error, req, res, _next) => {
  return res.status(400).json({ error: error.stack });
});

module.exports = router;
