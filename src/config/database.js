/**
 * @namespace Config
 * @property {module:DatabaseConfig} DatabaseConfig
 */

/**
 * Configuration Database Module.
 * Change this configs to setup connection strings
 * @module DatabaseConfig
 */
export default {
	dev: {
		local: {
			host: 'localhost',
			port: '27017',
			database: 'conte-um-conto'
		}
	},
	production: {
		conections: [{
			provider: 'heroku'
		}]
	},
	options: {
		useMongoClient: true,
		autoIndex: false, // Don't build indexes
		reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
		reconnectInterval: 500, // Reconnect every 500ms
		poolSize: 10, // Maintain up to 10 socket connections
		// If not connected, return errors immediately rather than waiting for reconnect
		bufferMaxEntries: 0
	}
}
