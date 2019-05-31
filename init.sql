CREATE DATABASE I18N DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

use I18N;

CREATE TABLE `key` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '문장 key ID',
  `name` varchar(255) NOT NULL COMMENT '문장 key 이름',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_name`(`name`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='문장의 key';

CREATE TABLE `translation` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '번역 ID',
  `keyId` int(10) NOT NULL COMMENT 'key ID',
  `locale` enum('ko','en','ja') NOT NULL COMMENT '번역 언어, ISO 639 Alpha-2 형식',
  `value` text NOT NULL COMMENT '번역된 문장',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_translation` (`keyId`, `locale`),
  KEY `key_keyId` (`keyId`),
  CONSTRAINT `FK_translation_key` FOREIGN KEY (`keyId`) REFERENCES `key` (`id`) ON DELETE CASCADE ON UPDATE CASCADE 
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT='번역된 문장';