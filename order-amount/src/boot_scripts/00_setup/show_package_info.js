'use strict';
const BootScript = require('./../../utils/BootScript');

const CONFIG = require('peanut-restify/config');
const logger = require('peanut-restify/logger');
const emoji = require('node-emoji');
const chalk = require('chalk');
const fs = require('fs');

class CustomScript extends BootScript {
  getName() {
    return 'info';
  }

  boot(next) {
    const packageJSON = JSON.parse(fs.readFileSync(`${__dirname}/../../../package.json`));

    const settings = {
      createdAt: (new Date()).toISOString(),
      name: packageJSON.name,
      author: packageJSON.author,
      version: packageJSON.version,
    };


    logger.info(emoji.emojify(`[setup] Name:       ${chalk.bold.green(settings.name)}`));
    logger.info(emoji.emojify(`[setup] Version:    ${chalk.bold.green(settings.version)}`));

    if (CONFIG.exists('DOCKER_TAG')) {
      settings.dockerTag = CONFIG.get('DOCKER_TAG');
      logger.info(emoji.emojify(`[setup] Docker Tag: ${chalk.bold.green(settings.dockerTag)}`));
    }

    console.log(' ');
    next(settings);
  }
}

module.exports = CustomScript;
