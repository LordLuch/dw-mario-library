const { createClientController, createBookController } = require('./controllers')
const { connectDatabase } = require('./models/db')
const { engine } = require('express-handlebars')
const express = require('express')
const app = express()

function createApp() {
	let server, mongoose
	async function start() {
		console.log('> [app] iniciando app...')
		configureApp()
		mongoose = await connectDatabase()
		registerAppRoutes()
		server = startListen()
		console.log('> [app] app iniciado...')
	}
	function stop() {
		console.log('> [app] encerrando app...')
		mongoose.connection.close()
		server.close()
		console.log('> [app] app encerrado...')
	}

	return { start, stop }

	function configureApp() {
		app.engine('handlebars', engine({ defaultLayout: 'main' }))
		app.set('view engine', 'handlebars')
		app.use(express.urlencoded({ extended: false }))
		app.use(express.json())
		app.use(express.static('public'))
	}
  
	function registerAppRoutes() {
		app.use(createClientController())
		app.use(createBookController())
		app.get('/create', (_req, res) => {
			res.render('create')
		})
	}
  
	function startListen() {
		return app.listen(8080, () => {
			console.log('> [app] o servidor foi inicializado na porta 8080')
		})
	}
}

module.exports = { createApp }