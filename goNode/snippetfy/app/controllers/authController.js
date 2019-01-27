const { User } = require('../models');
const bcrypt = require('bcryptjs');

module.exports = {
  signin(req, res) {
    res.render('auth/signin');
  },

  signup(req, res) {
    res.render('auth/signup');
  },

  async register(req, res, next) {
    const { email } = req.body;

    try {
      if (await User.findOne({ where: { email } })) {
        req.flash('error', 'E-mail já cadastrado');
        return res.redirect('back');
      }

      const password = await bcrypt.hash(req.body.password, 5);

      await User.create({ ...req.body, password });
      req.flash('success', 'Úsuario cadastrado com sucesso');
      return res.redirect('/');
    } catch (err) {
      return next(err);
    }
  },

  async authenticate(req, res, next) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        req.flash('error', 'Úsuario inexistente');
        return res.redirect('back');
      }

      if (!await bcrypt.compare(password, user.password)) {
        req.flash('error', 'Senha Incorreta');
        return res.redirect('back');
      }

      req.session.user = user;

      return req.session.save(() => {
        res.redirect('app/dashboard');
      });
    } catch (err) {
      return next(err);
    }
  },

  signout(req, res) {
    return req.session.destroy(() => {
      res.redirect('/');
    });
  },
};
