'use strict';
const { BadRequestError, NotFoundError } = require('../error');

function translationService(translationRepository, keyRepository) {
  function validateKey(keyId) {
    const key = keyRepository.getByID(keyId);
    if (!key.length) {
      throw new NotFoundError(`keyId : '${keyId}' doesn't exist!`);
    }
  }

  async function getAllByKey(keyId) {
    validateKey(keyId);

    return translationRepository.getAllByKey(keyId);
  }

  async function getOneByKeyAndLocale(keyId, locale) {
    validateKey(keyId);

    return translationRepository.getOneByKeyAndLocale(keyId, locale);
  }

  async function add(keyId, locale, translation) {
    validateKey(keyId);
    try {
      await translationRepository.add(keyId, locale, translation);

      return translationRepository.getOneByKeyAndLocale(keyId, locale);
    } catch (err) {
      if (err.message.includes('Duplicate entry')) {
        throw new BadRequestError('Duplicated translation');
      }
    }
  }

  async function edit(keyId, locale, translation) {
    validateKey(keyId);
    await translationRepository.edit(keyId, locale, translation);

    return translationRepository.getOneByKeyAndLocale(keyId, locale);
  }

  return {
    getAllByKey,
    getOneByKeyAndLocale,
    add,
    edit,
  };
}

module.exports = translationService;
