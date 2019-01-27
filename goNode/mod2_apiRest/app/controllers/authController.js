const mongoose = require('mongoose');


const sendMail = require('../../services/nodemailer');

const User = mongoose.model('User');

module.exports = {
  async signin(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: 'Usuário não encontrado' });
      }

      if (!await user.compareHash(password)) {
        return res.status(400).json({ error: 'Senha Invalida' });
      }

      return res.json({
        user,
        token: user.generateToken(),
      });
    } catch (err) {
      return next(err);
    }
  },

  async signup(req, res, next) {
    try {
      const { username, email } = req.body;

      if (await User.findOne({ $or: [{ username }, { email }] })) {
        return res.status(400).json({ error: 'Usuario ja cadastrado' });
      }

      const user = await User.create(req.body);

      sendMail({
        from: 'foo@bar.com',
        to: user.email,
        subject: `Bem Vindo, ${user.name}`,
        template: 'auth/register',
        context: {
          name: user.name,
          username: user.username,
        },
      });

      return res.json({
        user,
        token: user.generateToken(),
      });
    } catch (err) {
      return next(err);
    }
  },
};
