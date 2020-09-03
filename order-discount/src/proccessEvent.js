'use strict';
const chalk = require('chalk').default;
const CONFIG = require('peanut-restify/config');

const processDiscounts = (amount) => Math.floor(Math.random() * amount / 4) + Math.floor(amount / 7);

module.exports = (message, publishMessageOnQueue, markAsProcessed, log) => {
  const newMessage = {
    ...message,
    discount: processDiscounts(message.amount),
  };

  publishMessageOnQueue(newMessage)
    .then(ack => {
      log(newMessage, chalk.yellow('Order discount Calculated'), chalk.yellow(`Published to channel: ${chalk.redBright(CONFIG.get('QUEUE_EVENT_TO_PUBLISH'))} | ack: ${ack}`));
      markAsProcessed();
    })
    .catch(err => console.error(err));
};
