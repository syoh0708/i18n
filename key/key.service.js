'use strict';
const { BadRequestError, NotFoundError } = require('../error');

function keyService(keyRepository) {
  function validateKey(keyId) {
    const key = keyRepository.getByID(keyId);
    if (!key.length) {
      throw new NotFoundError(`keyId : '${keyId}' doesn't exist!`);
    }
  }

  async function get(name) {
    const keys = await keyRepository.get(name);

    if (!keys.length) {
      throw new NotFoundError(`name : '${name}' doesn't exist!`);
    }

    return keys;
  }

  async function add(name) {
    try {
      const keyId = await keyRepository.add(name);

      return keyRepository.getByID(keyId);
    } catch (err) {
      if (err.message.includes('Duplicate entry')) {
        throw new BadRequestError('Duplicated name');
      }
    }

  }

  async function edit(keyId, name) {
    try {
      validateKey(keyId);
      await keyRepository.edit(keyId, name);

      return keyRepository.getByID(keyId);
    } catch (err) {
      if (err.message.includes('Duplicate entry')) {
        throw new BadRequestError('Duplicated name');
      } else {
        throw err;
      }
    }
  }

  return {
    get,
    add,
    edit
  };
}

module.exports = keyService;