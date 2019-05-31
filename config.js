'use strict';
const mysqlConfig = {
  host: 'zigzag-test-instance.cummxtd0rcp2.ap-northeast-2.rds.amazonaws.com',
  port: '3306',
  user: 'master_user',
  password: 'password',
  database: 'I18N'
};
const languageDetectKey = '2c674d8e22eb84a5b2ee156e7990bdf9';

module.exports = {
  mysqlConfig,
  languageDetectKey,
};