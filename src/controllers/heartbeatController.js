import { connections } from '../config.js';
import mySqlClient from '../infra/mysqlDbClient.js';

const currenciesDbClient = mySqlClient(connections.currenciesDb);

const controller = {
	set(server) {
		server.get('/heartbeat/isAlive', this.isAlive);
		server.head('/heartbeat/isAlive', this.isAlive);
	},
	async isAlive(request, response, next) {
		try {
			console.log('handling heartbeat request');
			await currenciesDbClient.heartbeatAsync();

			response.send(200);
			return next();
		} catch (error) {
			console.error(error);
			response.send(500);
		}
	}
};

export default controller;
