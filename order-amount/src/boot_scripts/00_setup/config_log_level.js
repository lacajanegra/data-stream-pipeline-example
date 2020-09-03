'use strict';
const BootScript = require('./../../utils/BootScript');

const CONFIG = require('peanut-restify/config');
const logger = require('peanut-restify/logger');
const chalk = require('chalk');
class CustomScript extends BootScript {
  getName() {
    return 'logging';
  }

  boot(next) {
    if (CONFIG.exists('NODE_LOG_LEVEL')) {
      const level = CONFIG.get('NODE_LOG_LEVEL').toLowerCase();
      logger.info(`[setup] Set default log level to: ${chalk.bold.green(level)}`);
      logger.setLevel(level);
    }
    console.log('');
    next({
      level: logger.logger.level,
    });
  }
}

module.exports = CustomScript;
