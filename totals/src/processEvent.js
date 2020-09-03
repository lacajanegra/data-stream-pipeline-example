'use strict';
const logger = require('peanut-restify/logger');
const chalk = require('chalk').default;

let counter = 0;
module.exports = (message, publishMessageOnQueue, markAsProcessed) => {
  logger.info(chalk.yellow('order: '), message.order_id);
  logger.info(chalk.yellow('sub total: '), message.amount);
  logger.info(chalk.yellow('descuento: '), message.discount);
  logger.info(chalk.green('total: '), message.amount - message.discount);
  markAsProcessed();
};
