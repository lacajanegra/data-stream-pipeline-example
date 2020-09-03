'use strict';
const logger = require('peanut-restify/logger');
const chalk = require('chalk').default;

const log = (msg, preMsg, postMsg) => {
  let timeStamp = (new Date()).toISOString();
  // logger.info(`${chalk.bold.yellowBright(timeStamp)}: ${typeof msg !== 'string' ? JSON.stringify(msg) : msg} - ${appendParts.join(' ')}`);
  logger.info(`${preMsg}\n${JSON.stringify(msg, null, 2)}\n${postMsg}`);
};



let counter = 0;
module.exports = (message, publishMessageOnQueue, markAsProcessed) => {
  counter++;
  const newMessage = {
    order_id: message.order_id,
    user_dni: message.user_dni,
    user_name: message.user_name,
    total_orders_created: counter,
  };
  log(newMessage, chalk.yellow('User'), '------------------');
  markAsProcessed();
};
