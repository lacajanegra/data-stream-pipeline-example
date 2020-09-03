let order_id = 11111111;
const routeController = (queueClient) => {
	return (req, res) => {
		const { user_dni, user_name, products, amount } = req.body;

		queueClient.publish(process.env.QUEUE_EVENT_TO_PUBLISH, JSON.stringify({ order_id: order_id + 1, user_dni, user_name, products, amount }))
			.then(done => {
				console.log(`Published to queue with ack code: ${done}`);
				order_id++;
				res.send(`done ack: ${done}`)
			})
			.catch(err => {
				console.log(`Error publishing on queue: ${err}`);
				res.send(`error: ${err}`)
			});
	}
};

module.exports = routeController;