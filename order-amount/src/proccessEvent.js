'use strict';
const chalk = require('chalk').default;
const CONFIG = require('peanut-restify/config');

const calculateBirhtYear = () => Math.floor(Math.random() * 50000);

module.exports = (message, publishMessageOnQueue, markAsProcessed, log) => {
  const newMessage = {
    ...message,
    amount: calculateBirhtYear(),
  };

  publishMessageOnQueue(newMessage)
    .then(ack => {
      log(newMessage, chalk.yellow('Order Amount Calculated'), chalk.yellow(`Published to channel: ${chalk.redBright(CONFIG.get('QUEUE_EVENT_TO_PUBLISH'))} | ack: ${ack}`));
      markAsProcessed();
    })
    .catch(err => console.error(err));
};
