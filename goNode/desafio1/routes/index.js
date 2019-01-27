const express = require('express');
const ageRouter = require('./ages.js');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('main');
});

router.use('/age', ageRouter);

module.exports = router;
