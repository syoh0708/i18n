'use strict';

function languageDetectController(app) {
  return languageDetectService => {
    app.post('/language_detect', async (req, res) => {
      const { message } = req.query;

      return res.json({
        locale: await languageDetectService.detect(message)
      });
    });
  };
}

module.exports = languageDetectController;