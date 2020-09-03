'use strict';
const BootScript = require('./../../utils/BootScript');
const chalk = require('chalk');
const emoji = require('node-emoji');
const logger = require('peanut-restify/logger');

class CustomModule extends BootScript {
  boot(next) {
    logger.info(emoji.emojify(`[setup] :thumbsup: ${chalk.bold.green('All ready and set!')}`));
    console.log('');
    next();
  }
};

module.exports = CustomModule;
