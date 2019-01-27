const mongoose = require('mongoose');

const User = mongoose.model('User');
const Tweet = mongoose.model('Tweet');

module.exports = {
  async show(req, res, next) {
    try {
      const user = await User.findById(req.userId);
      const tweetCount = await Tweet.find({ user: user.id }).count();

      return res.json({
        user,
        tweetCount,
        followersCount: user.followers.length,
        followingCount: user.following.length,
      });
    } catch (err) {
      return next(err);
    }
  },

  async feed(req, res, next) {
    try {
      const user = await User.findById(req.userId);
      const { following } = user;

      const tweets = await Tweet
        .find({
          user: { $in: [user.id, ...following] },
        })
        .limit(50)
        .sort('-createdAt');

      return res.json(tweets);
    } catch (err) {
      return next(err);
    }
  },

  async update(req, res, next) {
    try {
      const id = req.userId;

      const {
        name,
        username,
        password,
        confirmPassword,
      } = req.body;

      if (password && password !== confirmPassword) {
        return res.status(400).json({ error: 'Password and Confirm Password don`t match' });
      }

      const user = await User.findByIdAndUpdate(id, { name, username }, { new: true });

      // using save method so the schema hooks will be triggered and password encrypted
      if (password) {
        user.password = password;
        await user.save();
      }

      return res.json(user);
    } catch (err) {
      return next(err);
    }
  },
};
