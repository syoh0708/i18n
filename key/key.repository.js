'use strict';
const query = require('../connection');

function keyRepository() {
  async function get(name) {
    return query(`SELECT * FROM \`key\` ${name ? `WHERE name = '${name}'` : ''}`);
  }

  async function getByID(id) {
    return query(`SELECT * from \`key\` WHERE id = ${id}`);
  }

  async function add(name) {
    return (await query(`INSERT INTO \`key\` (name) VALUES ('${name}')`)).insertId;
  }

  async function edit(id, name) {
    return query(`UPDATE \`key\` SET name = '${name}' WHERE id = ${id}`);
  }

  return {
    get,
    getByID,
    add,
    edit,
  };
}

module.exports = keyRepository;
