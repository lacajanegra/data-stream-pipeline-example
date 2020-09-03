'use strict';
const chalk = require('chalk').default;
const CONFIG = require('peanut-restify/config');
const logger = require('peanut-restify/logger');
const app = require('./utils/MainApp');
const processEvent = require('./processEvent');
console.clear();

let queueClient;

const log = (msg, appendParts) => {
  let timeStamp = (new Date()).toISOString();
  logger.info(`${chalk.bold.yellowBright(timeStamp)}: ${JSON.stringify(msg)} - ${appendParts.join(' ')}`);
};

app.hydrate('boot_scripts').then((modules) => {
  queueClient = app.get('queue/client/sdk');

  const publishMessageOnQueue = (message) => {
    return queueClient.publish(CONFIG.get('QUEUE_EVENT_TO_PUBLISH'), JSON.stringify(message));
  };

  app.on('module:queue:message:new', (eventName, msg, markAsProcessed) => {
    try {
      const message = JSON.parse(msg.data);
      logger.info('------------------');
      logger.info(chalk.yellow(`Incoming message from channel: ${chalk.redBright(CONFIG.get('QUEUE_EVENT_TO_SUBSCRIBE'))}`));

      processEvent(message, publishMessageOnQueue, markAsProcessed, log);
    } catch (error) {
      logger.error('An error has ocurred trying to process a new message.');
      logger.debug({
        'event_name': eventName,
        'message': msg.data,
        'exception': error,
      });
    }
  });

  /**
   * handle unhandled exception inside a queue module event
   */
  app.on('module:queue:unhandled_exception', (e) => {
    e.handled = true;
    console.log(e);
  });
});

/**
 * handle unhandled exception
 */
app.on('application:unhandled_rejection', (e) => {
  logger.error('An unhandled error has ocurred');
  logger.debug(e.error);
  throw e.error;
});

app.on('module:queue:max_retries_reached', (retries) => {
  // Send a Message for Alert that Queue is Disconnected
  console.log(chalk.bold.red('NATS is disconnected for too long!!'));
});
