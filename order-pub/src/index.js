const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const QueueClient = require('./NatsStreamingClient');
const routeController = require('./routeController');

const clientId = `client_${(new Date()).getTime()}`;
const clusterName = process.env.QUEUE_CLUSTER_NAME;
const cnx = process.env.QUEUE_CONNECTIONSTRING;

const configurations = {
	url: cnx,
	maxReconnectAttempts: -1,
	reconnectTimeWait: 4000,
};

// Connect to NATS Endpoints
const client = new QueueClient(clusterName, clientId, configurations);

client
	.on('queue:connect', (nc) => {
		const opts = nc.subscriptionOptions();
		// opts.setAckWait(5 * 1000); // 5s change default timeout
		opts.setManualAckMode(true); // Manual ACK (30s default)
		opts.setDeliverAllAvailable(); // Deliver all message (even from the persistent store)
		console.log('');
	})
	.on('queue:state_changed', (newState) => {
		const state = newState == 'connected' ? chalk.bold.green(newState) : chalk.bold.yellow(newState);
		console.log(`[queue] Status changed: ${state}`);
	})
	.on('queue:max_retries_reached', (retries) => {
		console.log('max retries reached', retries);
	});


const app = express();
app.use(bodyParser.json());
app.post('/order', routeController(client));

module.exports = app;