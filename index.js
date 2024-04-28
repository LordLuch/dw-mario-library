const { createApp } = require('./server')
const app = createApp()
try {
	app.start()
} catch (err) {
	app.stop()
	console.log(err)
}