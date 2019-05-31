'use strict';
const catchError = require('../catch-error');
const { BadRequestError } = require('../error');

function TranslationController(app) {
  const localeArray = ['ko', 'en', 'ja'];

  function validateLocale(locale) {
    if (!localeArray.includes(locale)) {
      throw new BadRequestError('invalid locale');
    }
  }

  return translationService => {
    app.get('/keys/:keyId/translations',
      catchError(async (req, res) => {
        const { keyId } = req.params;
        const translations = await translationService.getAllByKey(+keyId);

        return res.json({
          translations,
        });
      }),
    );

    app.get('/keys/:keyId/translations/:locale',
      catchError(async (req, res) => {
        const { keyId, locale } = req.params;
        validateLocale(locale);

        const translation = await translationService.getOneByKeyAndLocale(+keyId, locale);

        return res.json({
          translation,
        });
      }),
    );

    app.post('/keys/:keyId/translations/:locale',
      catchError(async (req, res) => {
        const { keyId, locale } = req.params;
        validateLocale(locale);

        const { value } = req.body;
        const translation = await translationService.add(+keyId, locale, value);

        return res.json({
          translation,
        });
      }),
    );

    app.put('/keys/:keyId/translations/:locale',
      catchError(async (req, res) => {
        const { keyId, locale } = req.params;
        validateLocale(locale);

        const { value } = req.body;
        const translation = await translationService.edit(+keyId, locale, value);

        return res.json({
          translation,
        });
      }),
    );
  };
}

module.exports = TranslationController;
