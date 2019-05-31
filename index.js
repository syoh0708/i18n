'use strict';
const express = require('express');
const app = express();
const keyController = require('./key/key.controller');
const translationController = require('./translation/translation.controller');
const languageDetectController = require('./language_detect/language_detect.controller');
const keyRepository = require('./key/key.repository')();
const translationRepository = require('./translation/translation.repository')();
const keyService = require('./key/key.service')(keyRepository);
const translationService = require('./translation/translation.service')(translationRepository, keyRepository);
const languageDetectService = require('./language_detect/language_detect.service')();

app.use(express.json());

keyController(app)(keyService);
translationController(app)(translationService);
languageDetectController(app)(languageDetectService);

app.listen(3000, () => {
  console.log('Translation app listening on port 3000!');
});