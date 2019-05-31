'use strict';
const { languageDetectKey } = require('../config');
const request = require('request-promise-native');

function languageDetectService() {
  async function detect(message) {
    const options = {
      uri: 'https://ws.detectlanguage.com/0.2/detect',
      qs: {
        q: message,
      },
      headers: {
        'User-Agent': 'Request-Promise',
        'Authorization': `Bearer ${languageDetectKey}`,
      },
      json: true
    };

    return (await request(options)).data.detections[0].language;
  }

  return {
    detect,
  };
}

module.exports = languageDetectService;