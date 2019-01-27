const express = require('express');
const moment = require('moment');

const router = express.Router();

const checkParams = (req, res, next) => {
  const { name, age } = req.query;
  if ((!name || !age) || (req.url.includes('/minor') && age >= 18) || (req.url.includes('/major') && age < 18)) {
    res.redirect('/');
  } else {
    next();
  }
};

router.get('/minor', checkParams, (req, res) => {
  const { name, age } = req.query;
  res.render('minor', { name, age });
});

router.get('/major', checkParams, (req, res) => {
  const { name, age } = req.query;
  res.render('major', { name, age });
});

router.post('/check', (req, res) => {
  const { date, name } = req.body;
  const idade = moment().diff(moment(date, 'YYYY/MM/DD'), 'years');
  const url = idade >= 18 ? 'major': 'minor';
  res.redirect(`/age/${url}?name=${name}&age=${idade}`);
});

module.exports = router;
