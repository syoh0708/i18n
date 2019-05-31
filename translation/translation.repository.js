'use strict';
const query = require('../connection');

function translationRepository() {
  async function getAllByKey(keyId) {
    return query(`SELECT * from translation WHERE keyId = ${keyId}`);
  }

  async function getOneByKeyAndLocale(keyId, locale) {
    return query(`SELECT * from translation WHERE keyId = ${keyId} AND locale = "${locale}"`);
  }

  async function add(keyId, locale, value) {
    return query(`INSERT INTO translation(keyId, locale, value) VALUES(${keyId}, "${locale}", "${value}")`);
  }

  async function edit(keyId, locale, value) {
    return query(`UPDATE translation SET value = "${value}" WHERE keyId = ${keyId} AND locale = "${locale}"`);
  }

  return {
    getAllByKey,
    getOneByKeyAndLocale,
    add,
    edit,
  };
}

module.exports = translationRepository;
